import { useEffect, useState } from "react"
import { ReadAllfiles } from "../../wailsjs/go/main/App"
import { main } from "../../wailsjs/go/models"


interface props {
    setEditMode: () => void
    getEdittingFilePath: (path:string) => void
}

function Files(props: props) {
    const [files, setFiles] = useState<main.File[]>([])
    const [edittingFilePath, setEdittingFilePath] = useState<string>("")

    useEffect(() => {
        ReadAllfiles().then((result) => {
            setFiles(result)
        })
    }, [])

    function startEdit(filePath: string) {
        props.setEditMode()
        props.getEdittingFilePath(filePath)
    }

    return (<>

        <div>
            {files.map((elem, ind) => {
                return (<>
                    <div key={ind}>
                        <button onClick={() => { startEdit(elem.RelativePath) }}>
                            {elem.Name.split(".")[0]}<br />
                        </button>
                    </div>
                </>)
            })}

        </div>
    </>)


}

export default Files