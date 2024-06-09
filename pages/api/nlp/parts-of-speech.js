// pages/api/nlp/parts-of-speech.js

/* import { nlp } from "../../../utils/nlp"; */
import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";

// Initialize winkNLP with the English model
const nlp = winkNLP(model);

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

    function getPossiblePOS(text) {
      const doc = nlp.readDoc(text);
      const tokens = doc.tokens().out();
      const posTags = tokens.map((token) => token.pos);
      return posTags;
    }

    const posTags = getPossiblePOS(word);

    // Send the POS tags back in the response
    res.status(200).json({
      word: word,
      posTags: posTags,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
