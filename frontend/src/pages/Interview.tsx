import logo from 'src/assets/images/logo-universal.png';
import DisplayQuestion from 'src/components/DisplayQuestion';
import { Link, redirect } from 'react-router-dom';

function Interview() {

    return (
        <>
        <div>
            <img src={logo} id="logo" alt="logo"/>
            <DisplayQuestion />
        </div>
        <Link to={"/finish"}>Go to finish</Link>

        </>
    )
}

export default Interview
