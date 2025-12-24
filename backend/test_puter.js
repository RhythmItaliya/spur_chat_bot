
require('dotenv').config();
const puter = require('@heyputer/puter.js/src/init.cjs').init(process.env.PUTER_AUTH_TOKEN);

async function test() {
    console.log('Testing Puter AI...');

    try {
        console.log('1. Testing simple chat (no options)...');
        const res1 = await puter.ai.chat('Hello');
        console.log('Success 1:', res1);
    } catch (e) {
        console.error('Error 1:', e);
    }

    try {
        console.log('2. Testing chat with model option (gpt-4o-mini)...');
        const res2 = await puter.ai.chat('Hello', { model: 'gpt-4o-mini' });
        console.log('Success 2:', res2);
    } catch (e) {
        console.error('Error 2:', e);
    }

    try {
        console.log('3. Testing chat with messages array and model option...');
        const messages = [{ role: 'user', content: 'Hello' }];
        const res3 = await puter.ai.chat(messages, { model: 'gpt-4o-mini' });
        console.log('Success 3:', res3);
    } catch (e) {
        console.error('Error 3:', e);
    }
}

test();
