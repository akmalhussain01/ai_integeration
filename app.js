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
        content: `you are a smart  personal assistant and give me the answers for the asked questions and the answer should be short.
        you have access the following tools 
        1.webSearch: Use this tool to get the latest information and real time data from the internet. You should only use this tool when you need to get the latest information and real time data from the internet.
        `,
      },
      {
        role: "user",
        content: "what is the latest model of claude code now ",
      },
    ],

    tools: [
      {
        "type": "function",
        "function": {
          "name": "webSearch",
          "description": "Use this tool to get the latest information and real time data from the internet. You should only use this tool when you need to get the latest information and real time data from the internet.",
          "parameters": {
            // JSON Schema object
            "type": "object",
            "properties": {
              "query": {
                "type": "string",
                "description": "The search query to get the latest information and real time data from the internet."
              }
            },
            "required": ["query"]
          }
        }
      }
    ],
    tool_choice: "auto"
  });


  const toolCall = completion.choices[0].message.tool_calls;
  if (!toolCall) {
    console.log(completion.choices[0].message.content);
    return;
  }

  for(const tool of toolCall){
    console.log(`tools:${JSON.stringify(tool)}`)

    const functionName=tool.function.name
    const functionArgs=tool.function.arguments

    if(functionName==="webSearch"){
      const result = await websearch(functionArgs)
      console.log(`result:${result}`)
    }
  }



}
main()

const websearch = async ({ query }) => {

  console.log('calling webSearch...');
  
  return "claude lastest model is fable 5"
}

