import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "No message provided." });
    }

    // Enable Streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Simulated Token Streaming
    const fakeResponse = 'This is a simulated response from Med-Gemma.';
    const tokens = fakeResponse.split(' ');

    let i = 0;

    const interval = setInterval(() => {
        if (i >= tokens.length) {
            clearInterval(interval);
            res.write('data: [DONE]\n\n');
            res.end();
        } else {
            res.write(`data: ${tokens[i]}\n\n`);
            i++;
        }
    }, 300);
});

app.get('/health', (req, res) => {
    res.send('OK');
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`)
});