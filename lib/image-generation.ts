import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.KINDE_SITE_URL || "https://ai-coloring-and-tracing.vercel.app",
    "X-Title": "Kiwiz - AI Coloring & Tracing",
  },
});

export interface ImageGenerationRequest {
  prompt: string;
  type: 'coloring' | 'tracing';
  style?: string;
}

export interface ImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
  prompt?: string;
}

export async function generateColoringImage(prompt: string): Promise<ImageGenerationResponse> {
  try {
    // Enhanced prompt for coloring pages
    const enhancedPrompt = `Simple black and white line art coloring page for children: ${prompt}. 
    Style: Clean line drawing, no colors, bold outlines, child-friendly, suitable for coloring with crayons, no shading, cartoon style, large simple shapes`;

    // Try to use OpenRouter's image generation model
    try {
      console.log('Attempting image generation with Gemini 2.5 Flash Image Preview...');
      console.log('Enhanced prompt:', enhancedPrompt);
      
      // Try different image generation models
      const modelsToTry = [
        "google/gemini-2.5-flash-image-preview",
        "google/gemini-2.0-flash-exp",
        "anthropic/claude-3.5-sonnet"
      ];
      
      for (const model of modelsToTry) {
        try {
          console.log(`Trying model: ${model}`);
          const imageResponse = await openai.chat.completions.create({
            model: model,
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: enhancedPrompt
                  }
                ]
              }
            ],
            modalities: ["image", "text"]
          });

          console.log(`Response from ${model}:`, JSON.stringify(imageResponse, null, 2));
          
          const message = imageResponse.choices[0]?.message;
          if (message?.images && message.images.length > 0) {
            const imageUrl = message.images[0].image_url.url;
            console.log(`Image generation successful with ${model}:`, imageUrl);
            return {
              success: true,
              imageUrl,
              prompt: enhancedPrompt
            };
          }
        } catch (modelError) {
          console.log(`Model ${model} failed:`, modelError);
          continue;
        }
      }
      
      console.log('All image generation models failed');
    } catch (imageError) {
      console.log('Image generation failed, falling back to text model:', imageError);
      console.log('Error details:', JSON.stringify(imageError, null, 2));
    }

    // Fallback to text model for enhanced prompt generation
    console.log('Using text model fallback...');
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Generate a detailed description for a coloring page: ${prompt}. 
              The description should be suitable for creating a simple line art coloring page for children aged 2-8. 
              Focus on: simple shapes, bold outlines, child-friendly subjects, no complex details.`
            }
          ]
        }
      ],
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    console.log('Text model response:', response);
    
    if (!response) {
      throw new Error('No response from AI model');
    }

    // Return placeholder with enhanced description
    console.log('Returning placeholder with enhanced description');
    return {
      success: true,
      imageUrl: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(prompt)}&description=${encodeURIComponent(response)}`,
      prompt: response
    };

  } catch (error) {
    console.error('Error generating coloring image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate image'
    };
  }
}

export async function generateTracingContent(prompt: string): Promise<ImageGenerationResponse> {
  try {
    // Enhanced prompt for tracing worksheets
    const enhancedPrompt = `Create a tracing worksheet for: ${prompt}. 
    The worksheet should include:
    - Large, dotted letters or numbers for tracing
    - Simple line drawings related to the content
    - Practice lines for handwriting
    - Child-friendly, educational design
    - Suitable for children aged 2-8
    - Black and white, printer-friendly format`;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Parse this tracing request and determine what should be traced: "${prompt}"
              Respond with a JSON object containing:
              - type: "letter", "number", or "word"
              - content: the actual character(s) to trace (single letter, single number, or word)
              - style: "uppercase", "lowercase", or "cursive"
              - description: a brief description for kids
              Only respond with valid JSON.`
            }
          ]
        }
      ],
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from AI model');
    }

    // Parse the JSON response
    let tracingData;
    try {
      tracingData = JSON.parse(response);
    } catch (parseError) {
      // Fallback parsing if JSON parsing fails
      tracingData = parseTracingPrompt(prompt);
    }

    return {
      success: true,
      imageUrl: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(prompt)}&type=tracing`,
      prompt: enhancedPrompt,
      tracingData
    };

  } catch (error) {
    console.error('Error generating tracing content:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate tracing content'
    };
  }
}

function parseTracingPrompt(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();
  
  // Extract letter from prompts like "Trace Alphabet A" or "Trace letter J"
  const letterMatch = prompt.match(/(?:letter|alphabet)\s+([A-Za-z])/i);
  if (letterMatch) {
    const letter = letterMatch[1].toUpperCase();
    return {
      type: "letter",
      content: letter,
      style: "uppercase",
      description: `Trace the letter ${letter}`
    };
  }
  
  // Extract number from prompts like "Trace number 8"
  const numberMatch = prompt.match(/number\s+(\d+)/i);
  if (numberMatch) {
    const number = numberMatch[1];
    return {
      type: "number",
      content: number,
      style: "uppercase",
      description: `Trace the number ${number}`
    };
  }
  
  // Extract word from prompts like "Spelling of One"
  const wordMatch = prompt.match(/(?:spelling|word)\s+of\s+([A-Za-z]+)/i);
  if (wordMatch) {
    const word = wordMatch[1].toUpperCase();
    return {
      type: "word",
      content: word,
      style: "uppercase",
      description: `Trace the word ${word}`
    };
  }
  
  // Extract cursive from prompts like "Trace alphabet z in cursive"
  const cursiveMatch = prompt.match(/(?:letter|alphabet)\s+([A-Za-z]).*cursive/i);
  if (cursiveMatch) {
    const letter = cursiveMatch[1].toUpperCase();
    return {
      type: "letter",
      content: letter,
      style: "cursive",
      description: `Trace the letter ${letter} in cursive`
    };
  }
  
  // Default fallback
  return {
    type: "letter",
    content: "A",
    style: "uppercase",
    description: "Trace the letter A"
  };
}

function extractLetterFromPrompt(prompt: string): string {
  // Extract letter from prompts like "Trace Alphabet A" or "Trace letter J"
  const letterMatch = prompt.match(/(?:letter|alphabet)\s+([A-Za-z])/i);
  if (letterMatch) {
    return letterMatch[1].toUpperCase();
  }
  
  // Extract number from prompts like "Trace number 8"
  const numberMatch = prompt.match(/number\s+(\d+)/i);
  if (numberMatch) {
    return numberMatch[1];
  }
  
  // Default fallback
  return "A";
}

// Alternative function for actual image generation using OpenRouter
export async function generateImageWithOpenRouter(prompt: string): Promise<ImageGenerationResponse> {
  try {
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            }
          ]
        }
      ],
      modalities: ["image", "text"]
    });

    const message = response.choices[0]?.message;
    if (message?.images && message.images.length > 0) {
      const imageUrl = message.images[0].image_url.url;
      return {
        success: true,
        imageUrl,
        prompt
      };
    }

    throw new Error('No image URL returned');

  } catch (error) {
    console.error('Error generating image with OpenRouter:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate image'
    };
  }
}
