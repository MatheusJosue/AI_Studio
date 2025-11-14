import { NextRequest, NextResponse } from "next/server";

/**
 * Pollinations.ai - Image Generation API
 * 100% FREE - No API key required
 * Model: FLUX (High Quality)
 * https://pollinations.ai/
 */

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt must be a non-empty string" },
        { status: 400 }
      );
    }

    const numImagesParam = request.nextUrl.searchParams.get('n');
    const numImages = numImagesParam
      ? Math.max(1, Math.min(4, parseInt(numImagesParam) || 1))
      : 1;

    const imagePromises = Array(numImages).fill(null).map(async (_, index) => {
      const seed = Date.now() + index;
      const encodedPrompt = encodeURIComponent(prompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;

      const imageResponse = await fetch(imageUrl);

      if (!imageResponse.ok) {
        throw new Error("Failed to generate image with Pollinations.ai");
      }

      const imageBlob = await imageResponse.blob();
      const buffer = await imageBlob.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const dataUrl = `data:${imageBlob.type};base64,${base64}`;

      return dataUrl;
    });

    const images = (await Promise.all(imagePromises)).filter((img) => img !== null);

    if (images.length > 0) {
      return NextResponse.json({
        success: true,
        images: images,
        count: images.length,
      });
    }

    return NextResponse.json(
      { error: "No image generated" },
      { status: 500 }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Image generation error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
