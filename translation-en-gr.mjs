import {HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
dotenv.config();

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

const hf = new HfInference(HF_ACCESS_TOKEN);

let result = await hf.translation({
    model: 't5-base',
    inputs:
      ` New York (CNN)When Liana Barrientos was 23 years old, she got married in Westchester County, New York.`
  })

console.log(result); 
