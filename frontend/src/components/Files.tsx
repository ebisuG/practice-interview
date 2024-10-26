import { useEffect, useState } from "react"
import { ReadAllfiles } from "../../wailsjs/go/main/App"
import { main } from "../../wailsjs/go/models"


function Files() {
    const [files, setFiles] = useState<main.File[]>([])

    useEffect(() => {
        ReadAllfiles().then((result) => {
            setFiles(result)
        })
    }, [])

    return (<>

        <div>
            {files.map((elem) => {
                return (<>
                    {elem.Name}<br />
                </>)
            })}

        </div>
    </>)


}

export default Files