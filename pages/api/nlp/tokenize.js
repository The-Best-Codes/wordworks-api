// pages/api/nlp/tokenize.js

import { tokenizer } from "wink-tokenizer";

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

    var tokens = tokenizer.tokenize(text);

    res.status(200).json({
      status: "success",
      message: "Tokens fetched successfully",
      tokens: tokens,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
