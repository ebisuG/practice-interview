//The import path should be relative path for build.
import { useState } from 'react';
import logo from './assets/images/logo-universal.png';
import Files from './components/Files';
import './Top.css';
import { Link } from 'react-router-dom';
import Edit from './components/Edit';

function Top() {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [edittingFilePath, setEdittingFilePath] = useState<string>("")


    function setEditMode() {
        setIsEditMode(true)
    }
    function setNormalMode() {
        setIsEditMode(false)
    }

    function getEdittingFilePath(path: string) {
        setEdittingFilePath(path)
    }

    return (
        <div id="Top">
            <img src={logo} id="logo" alt="logo" />
            {isEditMode ?
                <Edit {...{ filePath: edittingFilePath, setNormalMode }} />
                :
                <Files {...{ setEditMode, getEdittingFilePath }} />
            }
            <div>
                <Link to={"interview"}>Go to interview</Link>
            </div>

        </div>
    )
}

export default Top
