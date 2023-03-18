import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Code Buddy',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt

        const response = await openai.createCompletion({
            model: "code-davinci-002",
            prompt: `${prompt}`,
            // Higher temperature value means the model will take greater risks. 
            temperature: 0,
            max_tokens: 64,
            top_p: 1,
            // Its not going to repeat similar sentences often. Higher the number the less likely it will respond the same way to the same question.
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status[500].send({ error })
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'))