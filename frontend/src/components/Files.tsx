import { useEffect, useState } from "react"
import { DeleteQuestionFile, ReadAllfiles } from "../../wailsjs/go/main/App"
import { main } from "../../wailsjs/go/models"
import { Link } from "react-router-dom"
import CreateFile from "./CreateFile"


interface props {
    setEditMode: () => void
    getEdittingFilePath: (path: string) => void
}

function Files(props: props) {
    const [files, setFiles] = useState<main.File[]>([])
    const [isModal, setIsModal] = useState<boolean>(false)

    useEffect(() => {
        ReadAllfiles().then((result) => {
            setFiles(result)
        })
    }, [])

    function startEdit(filePath: string) {
        props.setEditMode()
        props.getEdittingFilePath(filePath)
    }

    async function deleteFile(filePath: string) {
        await DeleteQuestionFile([filePath])
        await ReadAllfiles().then((result) => {
            setFiles(result)
        })
    }

    return (<>

        <div>
            {files.map((elem, ind) => {
                return (
                    <div key={ind} className="flex justify-center">
                        <div className="outline outline-1 outline-[#969696] rounded 
                    mb-1 p-1 w-[400px] bg-amber-50 hover:bg-amber-100 flex min-h-12">
                            <div className="hover:underline cursor-pointer w-[250px] text-lg pl-3 pt-3" onClick={() => { startEdit(elem.RelativePath) }}>{elem.Name.split(".")[0]}</div>
                            <div className="hover:underline cursor-pointer w-[50px] pt-3 ml-5"><Link to={`interview?filePath=${elem.RelativePath}`}>Start</Link></div>
                            <div className="hover:underline cursor-pointer w-[50px] text-sm pt-3 pl-1 pr-1 ml-5 border border-red-200 bg-red-100 hover:bg-red-400 rounded" onClick={() => { deleteFile(elem.RelativePath) }}>Delete</div>
                        </div>
                    </div>
                )
            })}
            <div>
                <div className="flex justify-center" >
                    <div className="h-[30px] m-5 pt-1 pl-1 pr-1 hover:cursor-pointer bg-lime-100 border-lime-400 border rounded hover:bg-lime-300" onClick={() => setIsModal(true)}>
                        Create!
                    </div>
                </div>
                <CreateFile {...{ open: isModal, close: () => setIsModal(false), setIsModal: setIsModal, setFiles }} />
            </div>
        </div>
    </>)


}

export default Files