// pages/api/nlp/emotion.js

import fetch from "node-fetch";

/**
 * Handles the API request for fetching the sentiment.
 *
 * @route GET /api/nlp/emotion
 * @group nlp
 * @returns {Promise} 200 - Sentiment (Success)
 * @returns {Error}  500 - Unable to analyze sentiment. (Error)
 * @returns {Error}  400 - No text provided for analysis. (Error)
 */
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
