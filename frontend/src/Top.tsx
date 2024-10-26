//The import path should be relative path for build.
import logo from './assets/images/logo-universal.png';
import './Top.css';
import { Link } from 'react-router-dom';

function Top() {

    return (
        <div id="Top">
            <img src={logo} id="logo" alt="logo" />
            <div>
                <Link to={"interview"}>Go to interview</Link>
            </div>

        </div>
    )
}

export default Top
