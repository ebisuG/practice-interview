import { useRef } from "react"
import ReactDOM from "react-dom"
import { CreateNewFile } from "wailsjs/go/main/App"

interface props {
    close: () => void
    open: boolean
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateFile(props: props) {
    if (!props.open) {
        return null
    }
    const fileName = useRef("")

    function handleOnChange(e:React.ChangeEvent<HTMLInputElement>) {
        fileName.current = e.target.value
    }

    function createFile(name: string) {
        CreateNewFile([name])
        props.close()
    }

    return ReactDOM.createPortal(
        <>
            <div
                className="z-20  bg-slate-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div onClick={props.close} className="hover:cursor-pointer">X</div>
                <div><input ref={() => fileName} defaultValue={""} onChange={(e)=>handleOnChange(e)}/></div>
                <div>
                    <button onClick={()=>createFile(fileName.current)}> Create</button>
                </div>
            </div>
            <div className="z-10  bg-white fixed top-0 left-0 right-0 bottom-0 opacity-50" ></div>
        </>
        , document.getElementById("portal")!
    )


}


export default CreateFile