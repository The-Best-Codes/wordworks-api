// pages/api/nlp/parts-of-speech.js

import { nlp } from "../../../utils/nlp";

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

  let word;

  try {
    if (req.method === "POST") {
      ({ word } = req.body);
    } else if (req.method === "GET") {
      word = req.query.word;
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    if (!word) {
      return res.status(400).json({ error: "No word provided for analysis." });
    }

    // Tokenize the word you want to analyze
    const tokens = nlp.readDoc(word).tokens();

    // Get the part-of-speech tags for the token
    const posTags = tokens.length > 0 ? tokens[0].out("pos") : [];

    // Send the POS tags back in the response
    res.status(200).json({
      word: word,
      posTags: posTags,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
