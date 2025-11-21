import openai from "./openai-client";
import type { TracingPlan } from "./tracing-prompt-service";

export interface ImageGenerationRequest {
  prompt: string;
  type: "coloring" | "tracing";
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
    // ENHANCED: Maximize A4 page coverage with better vertical filling
    const enhancedPrompt = `
Create a black and white line art coloring page that MAXIMIZES coverage of an A4 paper page.

CRITICAL A4 PAGE FILLING REQUIREMENTS:
- The artwork should extend to within 2% of all four edges of the A4 page
- Use 98% of the vertical height - artwork should nearly touch top and bottom
- Use 96% of the horizontal width - artwork should nearly touch left and right
- Absolutely minimize any empty white space

HEADER PLACEMENT:
At the ABSOLUTE TOP, on ONE single compact line:
"Name: _______ (TOP LEFT AND BOLD)   Date: _______ (TOP RIGHT AND BOLD)"
- Use minimal vertical space for header (no more than 5% of page height)
- Place header text close to top edge
- Begin main artwork IMMEDIATELY below header

MAIN ARTWORK - MAXIMIZE VERTICAL USAGE:
- Artwork should start directly under header with minimal gap
- Extend artwork down to within 2% of bottom edge
- Fill the entire width between left and right margins
- Use tall, vertical compositions that utilize full height
- Avoid small centered artwork with large empty borders

ARTWORK COMPOSITION FOR A4 FILLING:
- Create artwork that naturally fills vertical space (trees, buildings, people, animals standing)
- Use elements that stretch from near top to near bottom
- Include background elements that extend to edges
- For horizontal subjects, add vertical elements on sides
- Make main subject large and prominent

ARTWORK STYLE:
- Simple black & white line art
- Bold outlines for easy coloring
- Cartoon-style, child-friendly
- No shading, no grayscale, no color
- Large simple shapes suitable for crayons
- Clean, printable lines

BASED ON USER REQUEST: "${prompt}"

Generate a coloring page that truly fills the A4 paper with minimal wasted space.
`;

    console.log("Attempting image generation with Gemini 2.5 Flash Image Preview...");
    console.log("Enhanced A4-filling prompt:", enhancedPrompt);

    const modelsToTry = [
      "google/gemini-2.5-flash-image-preview",
      "google/gemini-2.0-flash-exp",
      "anthropic/claude-3.5-sonnet",
    ];

    let lastError: Error | null = null;

    for (const model of modelsToTry) {
      try {
        console.log(`Trying model: ${model}`);
        
        // Add timeout handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        const imageResponse = await openai.chat.completions.create({
          model,
          messages: [
            {
              role: "user",
              content: [{ type: "text", text: enhancedPrompt }],
            },
          ],
          modalities: ["image", "text"],
        }, { signal: controller.signal });

        clearTimeout(timeoutId);

        console.log(`Response from ${model}:`, JSON.stringify(imageResponse, null, 2));

        const message = imageResponse.choices[0]?.message;
        if (message?.images && message.images.length > 0) {
          const imageUrl = message.images[0].image_url.url;
          console.log(`Image generation successful with ${model}:`, imageUrl);
          return {
            success: true,
            imageUrl,
            prompt: enhancedPrompt,
          };
        } else {
          console.warn(`Model ${model} returned no images`);
          lastError = new Error(`Model ${model} returned no images`);
        }
      } catch (modelError) {
        console.warn(`Model ${model} failed:`, modelError);
        lastError = modelError as Error;
        continue;
      }
    }

    console.log("All image generation models failed");

    // Fallback to text model
    console.log("Using text model fallback...");
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Generate a detailed description for a children's coloring page that maximizes A4 page coverage based on: ${prompt}.
Requirements: Header on one line at very top, artwork starts immediately below and extends to within 2% of bottom edge, fills 96% of width.`,
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    console.log("Text model response:", response);

    if (!response) {
      throw lastError || new Error("No response from any AI model");
    }

    // Safer placeholder URL construction
    const placeholderParams = new URLSearchParams({
      height: '400',
      width: '400', 
      text: prompt.substring(0, 100), // Limit length
      description: response.substring(0, 200) // Limit length
    });

    return {
      success: true,
      imageUrl: `/placeholder.svg?${placeholderParams.toString()}`,
      prompt: response,
    };
  } catch (error) {
    console.error("Error generating coloring image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate image",
    };
  }
}

export async function generateTracingContent(
  prompt: string,
  tracingPlan?: TracingPlan
): Promise<ImageGenerationResponse & { tracingData?: TracingPlan }> {
  try {
    const tracingPrompt = prompt;

    try {
      console.log("Attempting tracing image generation...");
      console.log("Tracing prompt:", tracingPrompt);

      const modelsToTry = [
        "google/gemini-2.5-flash-image-preview",
        "google/gemini-2.0-flash-exp",
        "anthropic/claude-3.5-sonnet",
      ];

      for (const model of modelsToTry) {
        try {
          console.log(`Trying model: ${model}`);
          const imageResponse = await openai.chat.completions.create({
            model,
            messages: [
              {
                role: "user",
                content: [{ type: "text", text: tracingPrompt }],
              },
            ],
            modalities: ["image", "text"],
          });

          console.log(`Response from ${model}:`, JSON.stringify(imageResponse, null, 2));

          const message = imageResponse.choices[0]?.message;
          if (message?.images && message.images.length > 0) {
            const imageUrl = message.images[0].image_url.url;
            console.log(`Tracing image generation successful with ${model}:`, imageUrl);
            return {
              success: true,
              imageUrl,
              prompt: tracingPrompt,
              tracingData: tracingPlan,
            };
          }
        } catch (modelError) {
          console.warn(`Tracing model ${model} failed:`, modelError);
          continue;
        }
      }

      console.log("All tracing image models failed, falling back to placeholder/text plan.");
    } catch (imageError) {
      console.warn("Tracing image generation failed, falling back to text placeholder:", imageError);
    }

    const placeholderContent = tracingPlan?.content ?? "A";

    return {
      success: true,
      imageUrl: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(
        placeholderContent
      )}&type=tracing`,
      prompt: tracingPrompt,
      tracingData: tracingPlan,
    };
  } catch (error) {
    console.error("Error generating tracing content:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate tracing content",
    };
  }
}

export async function generateImageWithOpenRouter(
  prompt: string
): Promise<ImageGenerationResponse> {
  try {
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: prompt }],
        },
      ],
      modalities: ["image", "text"],
    });

    const message = response.choices[0]?.message;
    if (message?.images && message.images.length > 0) {
      const imageUrl = message.images[0].image_url.url;
      return {
        success: true,
        imageUrl,
        prompt,
      };
    }

    throw new Error("No image URL returned");
  } catch (error) {
    console.error("Error generating image with OpenRouter:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate image",
    };
  }
}
