//React
import { useState } from "react";

//External
import { Configuration, OpenAIApi } from "openai";
import {
  Button,
  TextField,
  LinearProgress,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import TEST from "./assets/B.jpg";
import Loader from "./assets/loader.gif";
import React from "react";
import Delay from "./Utils/Delay";
import "./App.css";

const App = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [prompta, setPrompta] = useState<string>("");
  const [imagehid, setImagehid] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [resulta, setResulta] = useState<string>("");

  const [isLoading, setLoading] = useState<boolean>(true);
  const [texthid, setTexthid] = useState<boolean>(false);
  const [state, setState] = useState("Listening");
  

  const configuration = new Configuration({
     apiKey: "_________",
  });
  //process.env.REACT_APP_OPENAI_API_KEY,
  const openai = new OpenAIApi(configuration);

  const handleclick = () => {
    console.log("click");
    // setResult(Loader);
    generateImage();
    generateText();
    HiddenManager();
  };

  const HiddenManager = () => {
    var resElement = document.getElementById("Results");
    resElement?.classList.remove("hidden");
    }
    


  const generateImage = async () => {
    setLoading(false);
    const response = await openai.createImage({
      prompt: "Cartoon of someone trying to survie to " + prompt,
      n: 1,
      size: "1024x1024",
    });
    setLoading(true);
    setImagehid(false);
    setResult(response.data?.data[0]?.url || "");
    // setResult(result);
  };

  const generateText = async () => {
    setLoading(false);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Explain how to survive to " + prompta,
      temperature: 0.5,
      max_tokens: 476,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      stop: ["You:"],
    });
    setLoading(true);
    setTexthid(false);
    setResulta(response.data.choices[0].text || "");
  };

  return (
    <Stack>
      <div className="Savior">
        {/* <Box className="Loader" hidden={isLoading} sx={{ width: "100%", marginBottom: "1rem" }}>
          <LinearProgress />
        </Box> */}
        <div className="Main">
          <h1 className="Title">How to survive to</h1>
          <TextField
            style={{ width: "80%", marginTop: "3%" }}
            id="filled-basic"
            label="Ask the Guide what to survive to"
            variant="filled"
            className="app-input"
            onChange={(e) => {
              setPrompt(e.target.value);
              setPrompta(e.target.value);
            }}
          />

          <br />
          <Button
            href="#Results"
            className="app-button"
            sx={{ marginTop: "3%", backgroundColor: "#054622" }}
            variant="contained"
            size="large"
            onClick={handleclick}
          >
            Show me
          </Button>
        </div>
        {/* resultat de l'image */}
        <div className="Results hidden" id="Results">
          {/* <img className="result-image" src={result} /> */}
          <div className="img-container">
            <img className="result-image" src={result} />
          </div>

          <br />
          {/* resultat du texte  */}
          <div className="txt-container">
            <h1 className="result-text-title">Answer from the Guide :</h1>
            {/* <p className="result-text">
              {resulta}
            </p> */}
            <p className="result-text">{resulta}</p>
          </div>
        </div>
      </div>
    </Stack>
  );
};
export default App;
