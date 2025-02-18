import fetch from "node-fetch";

// Helper function to fetch words from a URL and return a random word
async function fetchRandomWord(url, key, wordType) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json(); // Assuming the response is JSON formatted
  let words = data[key];

  //console.log(`Fetched ${words.length} ${wordType} words from ${url}`);

  // Special handling for verbs due to their structure
  if (wordType === "verb" || wordType === "verbPresent") {
    const randomVerbObject = words[Math.floor(Math.random() * words.length)];
    // Assuming you want to randomly choose between 'past' and 'present'
    const tense = ["past", "present"][Math.floor(Math.random() * 2)];
    return randomVerbObject[tense];
  }

  return words[Math.floor(Math.random() * words.length)];
}

// Function to get the word types and their corresponding URLs
function getWordTypeUrl(wordType) {
  const urls = {
    noun: "https://github.com/dariusk/corpora/raw/master/data/words/nouns.json",
    verb: "https://github.com/dariusk/corpora/raw/master/data/words/verbs.json",
    verbPresent:
      "https://github.com/dariusk/corpora/raw/master/data/words/verbs.json",
    adj: "https://github.com/dariusk/corpora/raw/master/data/words/adjs.json",
    adverb:
      "https://github.com/dariusk/corpora/raw/master/data/words/adverbs.json",
  };
  return {
    url: urls[wordType],
    key: wordType === "verbPresent" ? "verbs" : wordType + "s",
  };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  res.setHeader("Content-Type", "application/json");

  try {
    const queryParams = req.query;
    const wordsParam = queryParams.words
      ? JSON.parse(queryParams.words)
      : ["verb", "adj", "noun"];
    const separator = queryParams.separator || "-";

    //console.log(wordsParam, separator);
    //console.log(JSON.stringify(wordsParam) + " <-- wordsParam");

    const wordsPromises = wordsParam.map((wordType) => {
      const { url, key } = getWordTypeUrl(wordType);
      return fetchRandomWord(url, key, wordType);
    });

    const words = await Promise.all(wordsPromises);
    const sentence = words.join(separator);

    res.status(200).json({ data: sentence });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
