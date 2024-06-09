// pages/api/nlp/parts-of-speech.js

import posTagger from "wink-pos-tagger";
var tagger = posTagger();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests for CORS
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  let text;

  try {
    if (req.method === "POST") {
      ({ text } = req.body);
    } else if (req.method === "GET") {
      text = req.query.text;
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    if (!text) {
      return res.status(400).json({ error: "No text provided for analysis." });
    }

    var taggedSentence = tagger.tagSentence(text);

    res.status(200).json({
      status: "success",
      message: "Parts of Speech fetched successfully",
      partsOfSpeech: taggedSentence,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
