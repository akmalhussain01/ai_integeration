import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const groq = new Groq();




async function main() {
  const completion = await groq.chat.completions.create({
    model: "groq/compound",
    // temperature: 0.7,
    // top_p: 0.8,
    // stop:'ne',
    // frequency_penalty: 0.5,
    // presence_penalty: 0.5,
    // max_completion_tokens: 100,
    messages: [
        {
          role: "system",
          content: "jarvis , a smart  personal assistant ",
        },
      {
        role: "user",
        content: "who are you ?",
      },
    ],
  });
  console.log(completion.choices[0].message.content);
}
main()