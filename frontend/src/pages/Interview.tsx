import logo from 'src/assets/images/logo-universal.png';
import DisplayQuestion from 'src/components/DisplayQuestion';
import { Link, redirect, useSearchParams } from 'react-router-dom';

function Interview() {

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
        <div>
            <img src={logo} id="logo" alt="logo"/>
            <DisplayQuestion {...{filePath:searchParams.get("filePath")}}/>
        </div>
        <Link to={"/finish"}>Go to finish</Link>

        </>
    )
}

export default Interview
