import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet,StartInterview} from "../wailsjs/go/main/App";

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [questions, setQuestions] = useState("")
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);
    const updateQuestions = (yml:string)=>setQuestions(yml)

    function greet() {
        Greet(name).then(updateResultText);
    }

    function startinterview(){
        StartInterview("").then()
    }

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo"/>
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text"/>
                <button className="btn" onClick={greet}>Greet</button>
            </div>
            <div>
                Questions from yml file : {questions}
            </div>
            <div>
                <button className="btn" onClick={startinterview}>Read yaml</button>
            </div>
        </div>
    )
}

export default App
