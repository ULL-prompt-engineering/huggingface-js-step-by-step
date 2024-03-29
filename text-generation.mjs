// You can import the functions you need directly from the module, rather than using the HfInference class:
import {textGeneration} from "@huggingface/inference";

import dotenv from 'dotenv';
dotenv.config();

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

let result = await textGeneration({
    accessToken: HF_ACCESS_TOKEN,
    model: 'gpt2',
    inputs: 'The answer to the universe is',
 });

console.log(result); 
/* { generated_text: 'The answer to the universe is not to be found in the universe itself, but in the universe itself' } */
