// pages/api/words/random.js

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
    const { startsWith, endsWith, contains, length } = req.query;
    const filteredWords = words
      .filter((word) => {
        if (startsWith) {
          return word.startsWith(startsWith);
        }
        if (endsWith) {
          return word.endsWith(endsWith);
        }
        if (contains) {
          return word.includes(contains);
        }
        if (length) {
          return word.length === parseInt(length);
        }
        return true;
      })
      .sort(() => 0.5 - Math.random());
    const randomWord = filteredWords[0];

    res.status(200).json({
      status: "success",
      message: "Word fetched successfully",
      word: randomWord,
    });
  } catch (error) {
    // Handle any errors that occur during file reading
    res
      .status(500)
      .json({ error: "Unable to read the word list.", message: error.message });
  }
}
