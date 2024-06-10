// pages/api/words/index.js

import wordArray from "./wordList.json";


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

  try {
    // Read the word list from the file
    const words = JSON.parse(JSON.stringify(wordArray));

    // Send the array of words as a response
    res.status(200).json({
      status: "success",
      message: "Words fetched successfully",
      wordArrayLength: words.length,
      words: words,
    });
  } catch (error) {
    // Handle any errors that occur during file reading
    res
      .status(500)
      .json({ error: "Unable to read the word list.", message: error.message });
  }
}
