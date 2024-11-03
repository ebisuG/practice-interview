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

    function deleteFile(filePath:string){
        DeleteQuestionFile([filePath])
        ReadAllfiles().then((result) => {
            setFiles(result)
        })
    }

    return (<>

        <div>
            {files.map((elem, ind) => {
                return (
                    <div key={ind}>
                        <div className="outline outline-1 outline-[#969696] rounded 
                    mb-1 p-1 min-w-full hover:bg-slate-300 flex ">
                            <div className="w-60">{elem.Name.split(".")[0]}<br /></div>
                            <div className="hover:underline cursor-pointer w-10" onClick={() => { startEdit(elem.RelativePath) }}>Edit</div>
                            <div className="hover:underline cursor-pointer w-20"><Link to={`interview?filePath=${elem.RelativePath}`}>Go to interview</Link></div>
                            <div className="hover:underline cursor-pointer w-12" onClick={()=>{deleteFile(elem.RelativePath)}}>Delete</div>
                        </div>
                    </div>
                )
            })}
            <div>
                <div onClick={()=>setIsModal(true)}>Create</div>
                <CreateFile {...{open:isModal, close:()=>setIsModal(false), setIsModal:setIsModal}}/>
            </div>
        </div>
    </>)


}

export default Files