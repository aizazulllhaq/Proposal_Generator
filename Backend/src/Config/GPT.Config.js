import OpenAI from "openai";
import { GPT_API_KEY } from "../constant.js";

const client = new OpenAI({
  apiKey: GPT_API_KEY,
});

async function gptGenerateProposal(prompt) {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return chatCompletion.choices[0].message.content;
}

export default gptGenerateProposal;
