const hfToken = process.env.HF_TOKEN;

const embeddingUrl = "https://api-inference.huggingface.co/pipeline/feature-extraction/intfloat/e5-large-v2";

interface Input {
    inputs: string;
}

type Response = number[] 

export const generateEmbedding = async (text: string): Promise<number[]> => {
    const headers = {
        Authorization: `Bearer ${hfToken}`,
        'Content-Type': 'application/json'
    }

    const body: Input = {
        inputs: text,
    }

    const response = await fetch(embeddingUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
    }

    const data = await response.json() as Response;
    return data
}

// const text = "This is a test sentence.";

// (async () => {
//   try {
//     const embedding = await generateEmbedding(text);
//     console.log("Generated embedding:", embedding);
//   } catch (error) {
//     console.error("Error generating embedding:", error);
//   }
// })();