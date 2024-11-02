import ReactDOM from "react-dom"

interface props {
    close: () => void
    open: boolean
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateFile(props: props) {
    if (!props.open) {
        return null
    }

    return ReactDOM.createPortal(
        <>
            <div onClick={props.close} 
            className="z-20  bg-slate-400 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Close</div>
            <div className="z-10  bg-white fixed top-0 left-0 right-0 bottom-0" ></div>
        </>
        , document.getElementById("portal")!
    )


}


export default CreateFile