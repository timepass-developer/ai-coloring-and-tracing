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
    const enhancedPrompt = `Simple black and white line art coloring page for children: ${prompt}. 
    Style: Clean line drawing, no colors, bold outlines, child-friendly, suitable for coloring with crayons, no shading, cartoon style, large simple shapes`;

    try {
      console.log("Attempting image generation with Gemini 2.5 Flash Image Preview...");
      console.log("Enhanced prompt:", enhancedPrompt);

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
                content: [
                  {
                    type: "text",
                    text: enhancedPrompt,
                  },
                ],
              },
            ],
            modalities: ["image", "text"],
          });

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
          }
        } catch (modelError) {
          console.log(`Model ${model} failed:`, modelError);
          continue;
        }
      }

      console.log("All image generation models failed");
    } catch (imageError) {
      console.log("Image generation failed, falling back to text model:", imageError);
      console.log("Error details:", JSON.stringify(imageError, null, 2));
    }

    console.log("Using text model fallback...");
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
              Focus on: simple shapes, bold outlines, child-friendly subjects, no complex details.`,
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    console.log("Text model response:", response);

    if (!response) {
      throw new Error("No response from AI model");
    }

    return {
      success: true,
      imageUrl: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(prompt)}&description=${encodeURIComponent(response)}`,
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
                content: [
                  {
                    type: "text",
                    text: tracingPrompt,
                  },
                ],
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
              text: prompt,
            },
          ],
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
