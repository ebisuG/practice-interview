import { useRef } from "react"
import ReactDOM from "react-dom"
import { CreateNewFile, ReadAllfiles } from "wailsjs/go/main/App"
import { main } from "wailsjs/go/models"

interface props {
    close: () => void
    open: boolean
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
    setFiles: React.Dispatch<React.SetStateAction<main.File[]>>
}

function CreateFile(props: props) {
    if (!props.open) {
        return null
    }
    const fileName = useRef("")

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        fileName.current = e.target.value
    }

    async function createFile(name: string) {
        if (name.length == 0) {
            props.close()
            return
        }
        await CreateNewFile([name])
        await ReadAllfiles().then((result) => {
            props.setFiles(result)
        })
        props.close()
    }

    return ReactDOM.createPortal(
        <>
            <div
                className="z-20  bg-amber-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-black border rounded">
                <div onClick={props.close} className="hover:cursor-pointer text-white bg-red-500 w-5 p-1 rounded">X</div>
                <div className="m-1"><input className="border p-1" ref={() => fileName} defaultValue={""} onChange={(e) => handleOnChange(e)} /></div>
                <div className="flex justify-center">
                    <div className="m-1 mb-5 text-center w-[50px] bg-lime-200 rounded border-lime-400 border">
                        <button onClick={() => createFile(fileName.current)}> Create</button>
                    </div>
                </div>
            </div>
            <div className="z-10  bg-white fixed top-0 left-0 right-0 bottom-0 opacity-50" ></div>
        </>
        , document.getElementById("portal")!
    )


}


export default CreateFile