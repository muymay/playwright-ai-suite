import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
    const message = await client.messages.create({
        model: 'claude-sonnet-4-5',
        max_tokens: 1024,
        messages:[
            {
                role: 'user',
                content: 'Say hello and confirm you are working.',
            },
        ],
    });
    console.log(message.content[0]);
}
main();
//npx ts-node ai-edge-cases/suggester.ts
