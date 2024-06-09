// pages/api/words/search.js

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
    const { startsWith, endsWith, contains, length, limit } = req.query;
    const filteredWords = words
      .filter((word) => {
        let matchesStartsWith = startsWith ? word.startsWith(startsWith) : true;
        let matchesEndsWith = endsWith ? word.endsWith(endsWith) : true;
        let matchesContains = contains ? word.includes(contains) : true;
        let matchesLength = length ? word.length === parseInt(length) : true;

        return (
          matchesStartsWith &&
          matchesEndsWith &&
          matchesContains &&
          matchesLength
        );
      })
      .sort(() => 0.5 - Math.random());

    let wordList;

    if (limit) {
      wordList = filteredWords.slice(0, parseInt(limit));
    } else {
      wordList = filteredWords;
    }

    if (!wordList || wordList.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No words found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Words fetched successfully",
      wordArrayLength: wordList.length,
      words: wordList,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to read the word list.", message: error.message });
  }
}
