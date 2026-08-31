import express from 'express';
import dotenv from 'dotenv';
import { generate } from './chatbot.js';
dotenv.config();

const app = express();
const PORT = 4000

//use before the routes
app.use(express.json());
app.use(express.urlencoded());



//post req for llm 

app.route('/chat').post(async (req, res) => {
    const { message } = req.body;
    console.log("usermessage:", message);

    const result = await generate(message);

    res.json({
        usermessage: message,
        result: result
    })

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})