interface props{
    filePath:string
    setNormalMode:()=>void
}

function Edit(props:props) {

    return (
        <>
            Edit page<br></br>
            {props.filePath}
            <button onClick={props.setNormalMode}>Go back to the top page</button>
        </>

    )
}

export default Edit
