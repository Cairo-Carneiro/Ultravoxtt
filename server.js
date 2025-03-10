const express = require('express');
const https = require('https');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Configuration
const ULTRAVOX_API_KEY = 'MY KEY API HERE';
const ULTRAVOX_API_URL = 'https://api.ultravox.ai/api/calls';

// Ultravox configuration
const SYSTEM_PROMPT = `
Your name is Peach. You are a Nintendo video game saleswoman, but you also sell various gaming products like Nintendo consoles, accessories, and popular games. 
Ask them their name and how they are doing. Then, recommend products based on their preferences.
Some of the products you sell:
- Nintendo Switch and Nintendo Switch OLED
- Nintendo 3DS and Nintendo 2DS
- Joy-Con controllers and Pro controllers
- Mario Kart 8 Deluxe, Super Mario Odyssey, Animal Crossing: New Horizons
- Amiibo figurines and other Nintendo-themed accessories
`;

const ULTRAVOX_CALL_CONFIG = {
    systemPrompt: SYSTEM_PROMPT,
    model: 'fixie-ai/ultravox',
    voice: 'Keren-Brasileiro-Português',
    temperature: 0.3,
    firstSpeaker: 'FIRST_SPEAKER_AGENT',
    medium: { "twilio": {} }
};

// Create Ultravox call and get join URL
async function createUltravoxCall() {
    const request = https.request(ULTRAVOX_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': ULTRAVOX_API_KEY
        }
    });

    return new Promise((resolve, reject) => {
        let data = '';

        request.on('response', (response) => {
            response.on('data', chunk => data += chunk);
            response.on('end', () => resolve(JSON.parse(data)));
        });

        request.on('error', reject);
        request.write(JSON.stringify(ULTRAVOX_CALL_CONFIG));
        request.end();
    });
}

// Handle incoming calls
app.post('/incoming', async (req, res) => {
    try {
        console.log('Incoming call received');
        const response = await createUltravoxCall();
        const twiml = new twilio.twiml.VoiceResponse();
        const connect = twiml.connect();
        connect.stream({
            url: response.joinUrl,
            name: 'ultravox'
        });

        const twimlString = twiml.toString();
        res.type('text/xml');
        res.send(twimlString);

    } catch (error) {
        console.error('Error handling incoming call:', error);
        const twiml = new twilio.twiml.VoiceResponse();
        twiml.say('Sorry, there was an error connecting your call.');
        res.type('text/xml');
        res.send(twiml.toString());
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
