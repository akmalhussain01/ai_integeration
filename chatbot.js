import Groq from "groq-sdk";
import dotenv from "dotenv";
import { tavily } from "@tavily/core";
import NodeCache from "node-cache";

dotenv.config();

const groq = new Groq();
const cache = new NodeCache({ stdTTL: 60 * 60 * 24 }); // 24 hours
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function generate(userMessage, threadId) {

    const basemessages = [
        {
            role: "system",
            content: `# Identity
You are Jarvis, a personal AI assistant.

# Response Rules
- Always answer in short, direct, to-the-point responses.
- No filler, no preamble, no restating the question.
- Plain conversational language only — never mention tools, functions, APIs, "web_search", or any internal process by name.
- Never say things like "I searched the web" or "using the webSearch tool" — just give the answer as if you already knew it.
- If you're unsure or can't find an answer, say so briefly instead of guessing.

# Tool Usage
You have access to:
1. web_search — for real-time, current, or fast-changing information (news, prices, scores, current events, "latest" or "today" queries, or anything after your knowledge cutoff).

Rules for tool use:
- Only call web_search when the answer genuinely requires current/real-time data.
- Do not use it for general knowledge, definitions, math, or static facts you already know.
- Never expose the tool name, arguments, or call syntax in your reply — the user should only see the final answer.
- After retrieving results, synthesize them into a short natural-language answer; do not dump raw search output.`,
        }
    ]

    const messages = cache.get(threadId) || basemessages;

    messages.push({
        role: "user",
        content: userMessage,
    });

    //tool calling loop
    while (true) {
        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            temperature: 0,
            // top_p: 0.8,
            // stop:'ne',
            // frequency_penalty: 0.5,  
            // presence_penalty: 0.5,
            // max_completion_tokens: 100,
            // response_format:{type:"json_object"},
            messages: messages,

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


        messages.push(completion.choices[0].message)

        const toolCall = completion.choices[0].message.tool_calls;

        if (!toolCall) {
            cache.set(threadId, messages);
            console.log(cache);
            
            return completion.choices[0].message.content;
        }


        for (const tool of toolCall) {
            // console.log(`tools:${JSON.stringify(tool)}`)

            const functionName = tool.function.name
            const functionArgs = tool.function.arguments

            if (functionName === "webSearch") {
                const result = await websearch(JSON.parse(functionArgs))
                // console.log(`result:${JSON.stringify(result)}`)
                messages.push({
                    tool_call_id: tool.id,
                    role: "tool",
                    name: functionName,
                    content: result
                })
            }
        }
    }

}

const websearch = async ({ query }) => {

    console.log('calling webSearch...');

    const response = await tvly.search(query);

    const result = response.results.map(result => result.content).join('\n\n')

    // console.log("final results from web",result);

    return result
}

