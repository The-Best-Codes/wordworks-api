// pages/api/nlp/emotion.js

import fetch from "node-fetch";


export default async function handler(req, res) {
  try {
    const { text } = req.query;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
      {
        headers: {
          Authorization: `Bearer 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`,
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    const results = await response.json();

    res.status(200).json({ emotions: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
