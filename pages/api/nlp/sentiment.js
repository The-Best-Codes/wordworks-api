// pages/api/nlp/sentiment.js

import natural from "natural";
const SentimentAnalyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new SentimentAnalyzer("English", stemmer, "afinn");

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests for CORS
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const { text } = req.method === "POST" ? req.body : req.query;

    if (!text) {
      return res.status(400).json({ error: "No text provided for analysis." });
    }

    const sentiment = analyzer.getSentiment(text.split(/\s+/));
    res.status(200).json({
      status: "success",
      sentimentScore: sentiment,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to analyze sentiment.",
      message: error.message,
    });
  }
}
