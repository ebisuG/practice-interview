//The import path should be relative path for build.
import logo from './assets/images/logo-universal.png';
import './Top.css';
import DisplayQuestion from './components/DisplayQuestion';

function Top() {

    return (
        <div id="Top">
            <img src={logo} id="logo" alt="logo"/>
            <DisplayQuestion />
        </div>
    )
}

export default Top
