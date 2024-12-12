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
    const randomWord = filteredWords[0];

    if (!randomWord) {
      return res.status(404).json({
        status: "error",
        message: "Word not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Word fetched successfully",
      word: randomWord,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to read the word list.", message: error.message });
  }
}
