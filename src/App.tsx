import { useState } from "react";

//External
import { Configuration, OpenAIApi } from "openai";
import { Button, TextField, LinearProgress, Box,Stack , Typography} from "@mui/material";

const App = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [prompta, setPrompta] = useState<string>("");
  const [imagehid, setImagehid] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [resulta, setResulta] = useState<string>("");

  const [isLoading, setLoading] = useState<boolean>(true);
  const [texthid, setTexthid] = useState<boolean>(false);

  const configuration = new Configuration({
    apiKey: "______",
  });
  //process.env.REACT_APP_OPENAI_API_KEY,
  const openai = new OpenAIApi(configuration);

  
  const handleclick = () => {
    console.log("click");
    generateImage();
    generateText();
  };

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
      <Box hidden={isLoading} sx={{ width: "100%", marginBottom: "1rem" }}>
        <LinearProgress />
      </Box>
      <Typography>How to survive to</Typography>
      <TextField
        style={{ width: "80%", marginTop: "3%" }}
        id="filled-basic"
        label="Entrez votre prompt pour l'image ou votre demande de texte"
        variant="filled"
        className="app-input"
        onChange={(e) => {
          setPrompt(e.target.value);
          setPrompta(e.target.value);
        }}
      />
      <br />
      <Button
        sx={{ marginTop: "3%", backgroundColor: "#683bdb" }}
        variant="contained"
        size="medium"
        onClick={handleclick}
      >
        Show me
      </Button>
      {/* resultat de l'image */}
      <Box hidden={imagehid}>
        <footer>
          <img className="result-image" src={result} />
        </footer>
      </Box>
      <br />
      {/* resultat du texte  */}
      <Box hidden={texthid} sx={{ marginTop: "3%" }}>
        <footer style={{ width: "80%", margin: "auto" }}>{resulta} </footer>
      </Box>
    </Stack>
  );
};
export default App;
