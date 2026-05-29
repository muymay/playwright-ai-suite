import Anthropic from "@anthropic-ai/sdk"; // import the Anthropic SDK
import * as dotenv from "dotenv"; // import the dotenv package to load environment variables from a .env file

dotenv.config(); // Load environment variables from .env file

const client = new Anthropic({ // create a new instance of the Anthropic client
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function suggestEdgeCases(featureDescription: string) { // define an asynchronous function that takes a feature description as input
    const message = await client.messages.create({ // create a new message using the client
        model: 'claude-sonnet-4-5', // this is the model being used this is all in the doc website
        max_tokens: 1024, // maximum tokens to generate in the response
        messages:[
            {
                role: 'user', 
                content: `You are a senior QA engineer.
                            Given this feature description: "${featureDescription}"

                            Return exactly 5 edge cases a manual tester might miss.
                            Format as a numbered list. Be specific and concise.`,

// ◇ injected env (1) from .env // tip: ⌁ auth for agents [www.vestauth.com]
// {
//   type: 'text',
//   text: "Hello! Yes, I'm working and ready to help you. How can I assist you today?"
// }
// Day 2: Input
// ◇ injected env (1) from .env // tip: ◈ encrypted .env [www.dotenvx.com]
// {
//   type: 'text',
//   text: '# 5 Edge Cases for Login Form Testing\n' +
//     '\n' +
//     '1. **Email field accepts whitespace**: Entering spaces before, after, or within the email address (e.g., " user@example.com " or "user @example.com") may bypass validation or cause authentication failures.\n' +
//     '\n' +
//     '2. **Password field allows paste but masks validation errors**: Pasting extremely long strings (10,000+ characters) into the password field may cause memory issues, UI freezing, or silent truncation without error messaging.\n' +
//     '\n' +
//     '3. **Rapid form submission (double-click)**: Clicking the login button multiple times in quick succession may trigger duplicate authentication requests, causing race conditions or account lockouts.\n' +
//     '\n' +
//     '4. **Browser autofill with outdated credentials**: Previously saved credentials that are no longer valid may autofill and submit without user awareness, potentially triggering security lockout mechanisms prematurely.\n' +
//     '\n' +
//     '5. **Special Unicode characters in email local-part**: Emails containing valid but uncommon Unicode characters (e.g., "user+테스트@example.com" or "user™@example.com") may be rejected despite being RFC-compliant.'
// }
            },
        ],
    });
    console.log(message.content[0].type === 'text' ? message.content[0].text: ''); // log the content of the first message in the response to the console 
    // changing console.log to print just the text
}
async function main() {
    await suggestEdgeCases('A login form with email and password fields');
    await suggestEdgeCases('A search box that filters a data table');
    await suggestEdgeCases('A registration form with name, email, and password');
}
main();
//npx ts-node ai-edge-cases/suggester.ts
