import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const configuration = new Configuration({
  organization: "blank",
  apiKey: "blank",
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { messages } = req.body;

  console.log("Received messages:", messages);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a Live Chatbot who will answer questions about Nathan Phan.",
      },
      ...messages,
    ],
  });

  console.log("Completion: ", completion.data.choices[0].message);
  res.json({
    completion: completion.data.choices[0].message,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
