import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const groq = new Groq();




async function main() {
  const completion = await groq.chat.completions.create({
    model: "groq/compound",
    messages: [
      {
        role: "user",
        content: "Hi",
      },
    ],
  });
  console.log(completion.choices[0].message);
}
main()