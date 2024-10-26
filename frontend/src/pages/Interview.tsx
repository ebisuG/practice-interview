import logo from './assets/images/logo-universal.png';
import './App.css';
import DisplayQuestion from 'src/components/DisplayQuestion';

function Interview() {

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo"/>
            <DisplayQuestion />
        </div>
    )
}

export default Interview
