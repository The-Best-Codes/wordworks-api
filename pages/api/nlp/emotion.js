// pages/api/nlp/emotion.js

import { pipeline } from "@huggingface/inference";

export default async function handler(req, res) {
  try {
    // Load the model
    const sentimentPipeline = await pipeline(
      "text-classification",
      "SamLowe/roberta-base-go_emotions"
    );

    const { text } = req.query;

    // Run the model and get predictions
    const results = await sentimentPipeline(text);

    // Respond with the results
    res.status(200).json({ emotions: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
