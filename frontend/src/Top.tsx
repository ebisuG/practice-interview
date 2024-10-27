//The import path should be relative path for build.
import { useState } from 'react';
import Files from './components/Files';
import './Top.css';
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
        <div id="Top" className='flex justify-center m-60'>
            {isEditMode ?
                <>
                    <Edit {...{ filePath: edittingFilePath, setNormalMode }} />
                </>
                : <>
                    <div>
                        <Files {...{ setEditMode, getEdittingFilePath }} />
                    </div>
                </>
            }
        </div>
    )
}

export default Top
