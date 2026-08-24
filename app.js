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
    response_format:{type:"json_object"},
    messages: [
        {
          role: "system",
          content: "jarvis , a smart  personal assistant give me the response in json format and in a single word ",
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