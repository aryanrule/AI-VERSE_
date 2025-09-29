const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");

dotenv.config();

 
const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
 

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigin = [
  "http://localhost:5173" , // dev
  "https://ai-verse-74se.vercel.app/"  , // prod  
]


app.use(cors({
    origin : function(origin,callback) {
        if(!origin || allowedOrigin.includes(origin)){
          callback(null , true);
        }else {
            callback(new Error("Not allowed by CORS ❌"));
        }
    } , 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json());

const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  geminiConfig,
});


const generate = async (prompt) => {
  try {
    
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    console.log(response);
    console.log(response.text());  
    return response;
  } catch (error) {
    console.log("response error", error);
  }
};
app.use(express.json());

app.post("/api/getdata", async (req, res) => {
  try {
    console.log("hitted");
    // console.log("prompt" , prompt);       
    const { prompt } = req.body;
    console.log("prompt" , prompt);  
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const output = await generate(prompt);
    res.json({ success: true, message: "Operation completed successfully"   ,response : output}); 
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/", (req, res) => {
    res.send("<h1>I am onnnn</h1>");
});


app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
