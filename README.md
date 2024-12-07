<img alt="WordWorks-API-Banner-Logo-Square" src="https://github.com/user-attachments/assets/32e3f3ed-f6bf-47b3-937a-397ce4a0d101" for="cover" width=320 />

## Docs: https://documenter.getpostman.com/view/36348829/2sA3kSoNjY

---

# Project: WordWorks Vercel API

The WordWorks API is currently deployed on Vercel and provides several API endpoints for word retrieval, info, natural language processing, and more.

# 📁 Collection: NLP

## End-point: Emotion Classification

This endpoint retrieves the emotions associated with the provided text. The request should include a query parameter "text" with the value being the input text for which emotions are to be analyzed.

It makes use of the Huggingface Inference API to access the model at the space here:

[https://huggingface.co/spaces/Best-codes/SamLowe-roberta-base-go_emotions](https://huggingface.co/spaces/Best-codes/SamLowe-roberta-base-go_emotions)

### Request Type

- HTTP GET Requests are supported
- HTTP POST Requests are supported

### Request Parameters

- `text` (string): The input text for which emotions are to be analyzed.

### Response

Upon successful execution, the server responds with a status code of 200 and a JSON object in the following format:

```json
{
  "emotions": [
    {
      "label": "",
      "score": 0
    }
  ]
}
```

The `emotions` array contains objects with "label" and "score" properties representing the emotions and their corresponding scores for the provided text.

### Method: GET

> ```
> https://wordworks-api.vercel.app/api/nlp/emotion?text=string
> ```

### Query Params

| Param | value  |
| ----- | ------ |
| text  | string |

---

## End-point: Parts of Speech Tagging

This endpoint retrieves the parts of speech for the provided text.

### Request Type

- HTTP GET Requests are supported
- HTTP POST Requests are supported

### Request Parameters

- `text` (string): The input text for which parts of speech are to be analyzed.

#### Response

Upon successful execution, the server responds with a status code of 200 and a JSON object in the following format:

```json
{
  "status": "success",
  "message": "Parts of Speech fetched successfully",
  "partsOfSpeech": [
    {
      "value": "",
      "tag": "",
      "normal": "",
      "pos": "",
      "lemma": ""
    }
  ]
}
```

The `partsOfSpeech` array contains objects with "value", "tag", "normal", "pos", and "lemma" properties representing the texts in the sentence and their POS data, as shown below:

- `value`: the classified text chunk in the object (e.g.: `string`)
- `tag`: the tag of the classified text chunk in the object (e.g.: `word | punctuation`)
- `normal`: the normal format of the classified text chunk (e.g.: `String` = `string)`
- `pos`: the part of speech of the classified text chunk (e.g.: `NN`)
- `lemma`: the technical form of the classified text chunk. A lemma is a form of a word that appears as an entry in a dictionary and is used to represent all the other possible forms. (e.g.: `strings` = `string`)

### Method: GET

> ```
> https://wordworks-api.vercel.app/api/nlp/parts-of-speech?text=string
> ```

### Query Params

| Param | value  |
| ----- | ------ |
| text  | string |

---

## End-point: Sentiment Analysis

This endpoint retrieves the sentiment score for a given text.

### Request Type

- HTTP GET Requests are supported
- HTTP POST Requests are supported

### Request Parameters

- `text` (string): The input text for which sentiment is to be analyzed.

### Response

The response for this request is a JSON object with the following format:

```json
{
  "status": "",
  "sentimentScore": 0
}
```

The sentimentScore can be between `-3` and `3`. Negative numbers represent negative sentiment (e.g., `hate` is `-3`), while positive numbers represent positive sentiment (e.g., `love` is `2`). `0` is equivalent to `neutral`.

The classifier works best with short phrases or single words and may throw errors when checking long texts.

### Method: GET

> ```
> https://wordworks-api.vercel.app/api/nlp/sentiment?text=string
> ```

### Query Params

| Param | value  |
| ----- | ------ |
| text  | string |

---

## End-point: Tokenizer

The endpoint tokenizes the provided input text.

[https://www.machinelearningplus.com/nlp/what-is-tokenization-in-natural-language-processing/](https://www.machinelearningplus.com/nlp/what-is-tokenization-in-natural-language-processing/)

### Request Type

- HTTP GET Requests are supported
- HTTP POST Requests are supported

### Request Parameters

- `text` (string): The input text to be tokenized.

### Response

The response for this request is a JSON object with the following format:

```json
{
  "status": "",
  "message": "",
  "tokens": [""]
}
```

### Method: GET

> ```
> https://wordworks-api.vercel.app/api/nlp/tokenize?text=string
> ```

### Query Params

| Param | value  |
| ----- | ------ |
| text  | string |

---

# 📁 Collection: Sentence

## End-point: Random Sentence (Phrase)

This endpoint creates a random sentence based on the provided words and separator. The request parameters include an array of words and a separator to be used in the sentence.

### Request Type

- HTTP GET Requests are supported

### Request Parameters

- `words` (string): The parts of speech, in the intended order, used to create the sentence.
- `separator` (string): The separator character to seperate each word in the sentence.

### Response

The response for this request is a JSON object with the following format:

```json
{
  "data": ""
}
```

Neither request parameter is required. The default `words` array is `["verb", "adj", "noun"]`, and the default `separator` is `-`.

Supported parts of speech for the `words` array are:

- `verb`: Verb. Currently, the API randomly chooses whether the verb is past or present tense.
- `adj`: Adjective.
- `noun`: Noun.
- `adverb`: Adverb.

### Method: GET

> ```
> https://wordworks-api.vercel.app/api/sentence/random?words=["verb", "adj", "noun"]&separator=_
> ```

### Query Params

| Param     | value                   |
| --------- | ----------------------- |
| words     | ["verb", "adj", "noun"] |
| separator | \_                      |

---

# 📁 Collection: Words

## End-point: List of Words

### GET /api/words

This endpoint retrieves a list of words.

#### Request

No request body is required for this endpoint.

#### Response

The response will be in JSON format with the following schema:

- `status` (string): The status of the response.
- `message` (string): A message related to the response.
- `wordArrayLength` (integer): The length of the array of words.
- `words` (array of strings): An array containing the words.

Example response:

```json
{
  "status": "",
  "message": "",
  "wordArrayLength": 0,
  "words": [""]
}
```

### Method: GET

> ```
> https://wordworks-api.vercel.app/api/words
> ```

---

## End-point: Random Word

### GET /words/random

This endpoint retrieves a random word from the WordWorks API.

#### Request

No request body is required for this endpoint.

#### Response

The response will be in JSON format with the following schema:

- `status` (string): The status of the response.
- `message` (string): Any additional message related to the response.
- `word` (string): The random word retrieved from the API.

Example:

```json
{
  "status": "",
  "message": "",
  "word": ""
}
```

### Method: GET

> ```
> https://wordworks-api.vercel.app/api/words/random
> ```

---

## End-point: Search Words

This endpoint searches for words based on various criteria such as start, end, contains, and length. The request parameters are:

- `startsWith` (string): Specifies the starting letter of the word to be searched.
- `endsWith` (string): Specifies the ending letter of the word to be searched.
- `contains` (string): Specifies a specific sequence of letters that the word must contain.
- `length` (integer): Specifies the length of the word to be searched.
- `limit` (integer): Specifies the maximum number of words to be returned in the response.

The response to the request is in JSON format with the following structure:

- `status` (string): Indicates the status of the response.
- `message` (string): Provides additional information about the response.
- `wordArrayLength` (integer): Represents the length of the array of words returned.
- `words` (array of strings): Contains the list of words that meet the search criteria.

Example response:

```json
{
  "status": "",
  "message": "",
  "wordArrayLength": 0,
  "words": [""]
}
```

### Method: GET

> ```
> https://wordworks-api.vercel.app/api/words/search?startsWith=A&endsWith=B&contains=SOR&length=6&limit=10
> ```

### Query Params

| Param      | value |
| ---------- | ----- |
| startsWith | A     |
| endsWith   | B     |
| contains   | SOR   |
| length     | 6     |
| limit      | 10    |

---

---

Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
