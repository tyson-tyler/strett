import axios from "axios";

export async function POST(req) {
  try {
    const { desc } = await req.json();

    if (!desc) {
      return new Response(JSON.stringify({ error: "Missing prompt" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.NEXT_PUBLIC_HF_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing API Key" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const huggingFaceURL =
      "https://router.huggingface.co/fal-ai/fal-ai/flux/krea";

    const response = await axios.post(
      huggingFaceURL,
      { prompt: desc },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const imageUrl = response.data?.images?.[0]?.url;

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: "No image URL in response" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ image: imageUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Image generation failed:", error.message || error);
    return new Response(JSON.stringify({ error: "Image generation failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
