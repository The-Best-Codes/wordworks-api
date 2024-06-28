// pages/api/sentence/random.js

import fetch from "node-fetch";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight requests for CORS
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    res.setHeader("Content-Type", "application/json");
    try {
        const nounResponse = await fetch(`https://github.com/dariusk/corpora/raw/master/data/words/nouns.json`);
        if (!nounResponse.ok) {
            throw new Error(`HTTP error! status: ${nounResponse.status}`);
        }
        const nounData = await nounResponse.text();
        const nounWords = JSON.parse(nounData);
        const randomNoun = nounWords.nouns[Math.floor(Math.random() * nounWords.nouns.length)];

        const verbResponse = await fetch(`https://github.com/dariusk/corpora/raw/master/data/words/verbs.json`);
        if (!verbResponse.ok) {
            throw new Error(`HTTP error! status: ${verbResponse.status}`);
        }
        const verbData = await verbResponse.text();
        const verbWords = JSON.parse(verbData);
        const randomVerbObject = verbWords.verbs[Math.floor(Math.random() * verbWords.verbs.length)];
        const randomVerb = randomVerbObject.past;

        const adjectiveResponse = await fetch(`https://github.com/dariusk/corpora/raw/master/data/words/adjs.json`);
        if (!adjectiveResponse.ok) {
            throw new Error(`HTTP error! status: ${adjectiveResponse.status}`);
        }
        const adjectiveData = await adjectiveResponse.text();
        const adjectiveWords = JSON.parse(adjectiveData);
        const randomAdjective = adjectiveWords.adjs[Math.floor(Math.random() * adjectiveWords.adjs.length)];

        const sentence = `${randomNoun}-${randomVerb}-${randomAdjective}`;

        res.status(200).json({ data: sentence });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}