// creating a context so that all the other childrens can use contextAPI
//Avoiding any kind of Prop drilling
import { useState } from "react";
import { createContext } from "react";
export const Context = createContext();

const ContextProvider = (props) => {
  //defing some state variables
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultdata, setResultData] = useState("");

  //the typing effect
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const generateAnswer = async () => {
    console.log("loadingggggggg");
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    //adding sidebar saving
    setPreviousPrompt((prev) => [...prev, input]);

    try {
      
      const response = await fetch("http://localhost:3000/api/getdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }), // <-- convert object to JSON string
      });
      const data = await response.json();
      console.log(data);  
      

      // console.log(
      //   response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      // ); 
      console.log(data?.response["candidates"][0]["content"]["parts"][0]["text"])
      
      const responseInText = data?.response["candidates"][0]["content"]["parts"][0]["text"]
      
      //i am bolding the *content* and removing the ** using split operations
      let responseArray = responseInText.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      let newResponse2 = newResponse.split("*").join("</br>");

      // setResultData(newResponse2);
      let newResponseArray = newResponse2.split(" ");
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }
      console.log("soifbndf");
    } catch (error) {
      console.log("error generating respose :", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    previousPrompt,
    setPreviousPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultdata,
    setResultData,

    generateAnswer,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
