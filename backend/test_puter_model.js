
require('dotenv').config();
const puter = require('@heyputer/puter.js/src/init.cjs').init(process.env.PUTER_AUTH_TOKEN);

async function test() {
    console.log('Testing Puter AI with claude-3-5-sonnet...');

    try {
        const res = await puter.ai.chat('Hello', { model: 'claude-3-5-sonnet' });
        console.log('Success:', res);
    } catch (e) {
        console.error('Error:', e);
    }
}

test();
