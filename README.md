## References 

* [Huggingface.js: Step-by-Step Guide to Getting Started](https://youtu.be/z41vJlPMqnE) by Developer Digest
* [Hugging Face JS libraries](https://huggingface.co/docs/huggingface.js/index)

## Versions

```
➜  huggingface-js-step-by-step git:(main) ✗ node --version
v20.5.0
➜  huggingface-js-step-by-step git:(main) ✗ npm  i --version
9.8.0
```

## Choosing a model

Go to https://huggingface.co/ then choose  [models](https://huggingface.co/models), choose the task you want to do, for intance [image-to-text](https://huggingface.co/models?pipeline_tag=image-to-text) then sort by likes and choose the model you want to use.
We are going to use the [nlpconnect/vit-gpt2-image-captioning](https://huggingface.co/nlpconnect/vit-gpt2-image-captioning) model.

## Code

```js
import {HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
dotenv.config();

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;
const inference = new HfInference(HF_ACCESS_TOKEN);

const model = "nlpconnect/vit-gpt2-image-captioning";
const imgUrl = "https://cdn.mos.cms.futurecdn.net/HjFE8NKWuCmgfHCcndJ3rK.jpg";

const response = await fetch(imgUrl);
const imageBlob = await response.blob();
const result = await inference.imageToText({
    data: imageBlob,
    model,
});

console.log('result', result); // { generated_text: 'a zebra standing in a field of tall grass ' }
```

## Summarization

[acebook/bart-large-cnn](https://huggingface.co/facebook/bart-large-cnn)