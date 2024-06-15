import { createContext, useState } from "react";
import runChat from "../Config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [resultData, setResultData] = useState("");
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);


    const delayPara = (index,nextWord) => {

        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)

    }

    const newChat = () =>{
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
       if(prompt !== undefined){
            response = await runChat(prompt);
            setRecentPrompt(prompt)
       }
       else{
            setPrevPrompt(prev => [...prev,input])
            setRecentPrompt(input)
            response = await runChat(input);
       }
        let responseArray = response.split("**");
        let newResponse="";

        for(let i = 0; i < responseArray.length; i++) {
            if(i === 0 || i%2 !== 1 ){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>") 
        let newResponsArray = newResponse2.split(" ");

        for(let i = 0; i < newResponsArray.length; i++){
            const nextWord = newResponsArray[i]
            delayPara(i, nextWord+" ")
        }
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        onSent,
        input,
        setInput,
        showResult,
        setLoading,
        setRecentPrompt,
        recentPrompt,
        resultData,
        loading,
        prevPrompt,
        setPrevPrompt,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
