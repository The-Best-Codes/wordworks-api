// utils/nlp.js

import winkNLP from "wink-nlp";
import model from "wink-eng-lite-model";

// Initialize winkNLP with the English model
const nlp = winkNLP(model);

export default { nlp };
