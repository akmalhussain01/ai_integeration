import express from 'express';
import dotenv from 'dotenv';
import { generate } from './chatbot.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 4000

//use before the routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());



//post req for llm 

app.route('/chat').post(async (req, res) => {
    const { message } = req.body;
    console.log("usermessage:", message);

    const result = await generate(message);
    console.log(`Jarvis ${result}`);


    res.json({
        message: result
    })

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})