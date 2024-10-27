import { useEffect, useState } from "react"
import { ReadAllfiles } from "../../wailsjs/go/main/App"
import { main } from "../../wailsjs/go/models"
import { Link } from "react-router-dom"


interface props {
    setEditMode: () => void
    getEdittingFilePath: (path: string) => void
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
                    <div key={ind} className="cursor-pointer 
                    outline outline-1 outline-[#969696] rounded 
                    mb-1 p-1
                    min-w-64 hover:bg-slate-300">
                        <div onClick={() => { startEdit(elem.RelativePath) }}>
                            {elem.Name.split(".")[0]}<br />
                        </div>
                    </div>
                    <div>
                        <Link to={"interview"}>Go to interview</Link>
                    </div>
                </>)
            })}

        </div>
    </>)


}

export default Files