import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const groq = new Groq();




async function main() {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    // top_p: 0.8,
    // stop:'ne',
    // frequency_penalty: 0.5,
    // presence_penalty: 0.5,
    // max_completion_tokens: 100,
    // response_format:{type:"json_object"},
    messages: [
        {
          role: "system",
          content: "you are a smart  personal assistant and give me the answers for the asked questions and the answer should be short  ",
        },
      {
        role: "user",
        content: "what is the latest model of claude code now ",
      },
    ],
  });
  console.log(completion.choices[0].message.content);
}
main()