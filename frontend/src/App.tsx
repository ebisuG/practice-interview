import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet,StartInterview} from "../wailsjs/go/main/App";
import {main} from "../wailsjs/go/models"

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [questions, setQuestions] = useState<main.Questions>()
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);
    const updateQuestions = (yml:main.Questions)=>setQuestions(yml)

    function greet() {
        Greet(name).then(updateResultText);
    }

    function startinterview(){
        StartInterview("").then(updateQuestions)
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
                Early Questions from yml file : {questions?.Stages.Early}<br></br>
                Middle Questions from yml file : {questions?.Stages.Middle}<br></br>
                Late Questions from yml file : {questions?.Stages.Late}
            </div>
            <div>
                <button className="btn" onClick={startinterview}>Read yaml</button>
            </div>
        </div>
    )
}

export default App
