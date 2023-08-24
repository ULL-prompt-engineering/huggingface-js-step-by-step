## References 

Watch and follow the steps in the video [Huggingface.js: Step-by-Step Guide to Getting Started](https://youtu.be/z41vJlPMqnE) by Developer Digest:

[![Huggingface.js: Step-by-Step Guide to Getting Started](https://img.youtube.com/vi/z41vJlPMqnE/maxresdefault.jpg)](https://youtu.be/z41vJlPMqnE)


Here is the documentation of the libraries used in the video:

[Hugging Face JS libraries](https://huggingface.co/docs/huggingface.js/index)

And this reference takes you to the Prompt Engineering 101 course:

[ULL-prompt-engineering/prompt-engineering-101](https://github.com/ULL-prompt-engineering/prompt-engineering-101)
  
## Versions

```
➜  huggingface-js-step-by-step git:(main) ✗ node --version
v20.5.0
➜  huggingface-js-step-by-step git:(main) ✗ npm  i --version
9.8.0
```

## Choose a model and make it work

Go to https://huggingface.co/ then choose  [models](https://huggingface.co/models), choose the task you want to do, for intance [image-to-text](https://huggingface.co/models?pipeline_tag=image-to-text) then sort by likes and choose the model you want to use.
For our first example, we are going to use the [nlpconnect/vit-gpt2-image-captioning](https://huggingface.co/nlpconnect/vit-gpt2-image-captioning) model.

Here is the code of [huggingface.mjs](/huggingface.mjs)

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

## Easily swapping the model: Summarization

In example [summarization.mjs](/summarization.mjs) we use the [facebook/bart-large-cnn](https://huggingface.co/facebook/bart-large-cnn) model.

``` js
import {HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
dotenv.config();

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

const hf = new HfInference(HF_ACCESS_TOKEN);

let result = await hf.summarization({
    model: 'facebook/bart-large-cnn',
    inputs:
      `
      New York (CNN)When Liana Barrientos was 23 years old, she got married in Westchester County, New York.
      A year later, she got married again in Westchester County, but to a different man and without divorcing her first husband.
      Only 18 days after that marriage, she got hitched yet again. Then, Barrientos declared "I do" five more times, sometimes only within two weeks of each other.
      In 2010, she married once more, this time in the Bronx. In an application for a marriage license, she stated it was her "first and only" marriage.
      Barrientos, now 39, is facing two criminal counts of "offering a false instrument for filing in the first degree," referring to her false statements on the
      2010 marriage license application, according to court documents.
      Prosecutors said the marriages were part of an immigration scam.
      On Friday, she pleaded not guilty at State Supreme Court in the Bronx, according to her attorney, Christopher Wright, who declined to comment further.
      After leaving court, Barrientos was arrested and charged with theft of service and criminal trespass for allegedly sneaking into the New York subway through an emergency exit, said Detective
      Annette Markowski, a police spokeswoman. In total, Barrientos has been married 10 times, with nine of her marriages occurring between 1999 and 2002.
      All occurred either in Westchester County, Long Island, New Jersey or the Bronx. She is believed to still be married to four men, and at one time, she was married to eight men at once, prosecutors say.
      Prosecutors said the immigration scam involved some of her husbands, who filed for permanent residence status shortly after the marriages.
      Any divorces happened only after such filings were approved. It was unclear whether any of the men will be prosecuted.
      The case was referred to the Bronx District Attorney\'s Office by Immigration and Customs Enforcement and the Department of Homeland Security\'s
      Investigation Division. Seven of the men are from so-called "red-flagged" countries, including Egypt, Turkey, Georgia, Pakistan and Mali.
      Her eighth husband, Rashid Rajput, was deported in 2006 to his native Pakistan after an investigation by the Joint Terrorism Task Force.
      If convicted, Barrientos faces up to four years in prison.  Her next court appearance is scheduled for May 18.      
      `.replace(/\n/g, ''),
    parameters: {
      max_length: 100
    }
  })

console.log('result', result);
```

Here is the execution:

```
➜  huggingface-js-step-by-step git:(main) node summarization.mjs
result {
  summary_text: 'Liana Barrientos has been married 10 times, sometimes within two weeks of each other. Prosecutors say the marriages were part of an immigration scam. She is believed to still be married to four men, and at one time, she was married to eight men at once.'
}
```