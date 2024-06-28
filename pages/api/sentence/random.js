import fetch from "node-fetch";

// Helper function to fetch words from a URL and return a random word
async function fetchRandomWord(url, key) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    const words = JSON.parse(data);
    return words[key][Math.floor(Math.random() * words[key].length)];
}

// Function to get the word types and their corresponding URLs
function getWordTypeUrl(wordType) {
    const urls = {
        noun: 'https://github.com/dariusk/corpora/raw/master/data/words/nouns.json',
        verb: 'https://github.com/dariusk/corpora/raw/master/data/words/verbs.json',
        verbPresent: 'https://github.com/dariusk/corpora/raw/master/data/words/verbs.json',
        adjective: 'https://github.com/dariusk/corpora/raw/master/data/words/adjs.json',
    };
    return { url: urls[wordType], key: wordType === 'verbPresent' ? 'present' : wordType + 's' };
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
        const wordsParam = queryParams.words ? JSON.parse(queryParams.words) : ["verb", "adjective", "noun"];
        const separator = queryParams.separator || '-';

        const wordsPromises = wordsParam.map(wordType => {
            const { url, key } = getWordTypeUrl(wordType);
            return fetchRandomWord(url, key);
        });

        const words = await Promise.all(wordsPromises);
        const sentence = words.join(separator);

        res.status(200).json({ data: sentence });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}