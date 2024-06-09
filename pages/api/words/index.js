// pages/api/words/index.js

import { readFile } from "fs/promises";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests for CORS
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const path = req.query.path || "../../../public/words/wordList.json";

  try {
    // Read the word list from the JSON file
    const data = await readFile(path, "utf8");
    const words = JSON.parse(data);

    // Send the array of words as a response
    res.status(200).json(words);
  } catch (error) {
    // Handle any errors that occur during file reading
    res
      .status(500)
      .json({ error: "Unable to read the word list.", message: error.message });
  }
}
