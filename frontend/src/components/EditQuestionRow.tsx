import { useRef } from "react"
import { main } from "wailsjs/go/models"

interface props {
    stage: keyof main.Stages
    questions:string[]
    updateQuestion: (s: keyof main.Stages, q: string[]) => void
}

function EditQuestionRow(props: props) {
    //Reference for real element
    const editingQuestions = useRef<HTMLTextAreaElement[]>([])

    function handleOnChange(updated: string, ind: number) {
        editingQuestions.current[ind].value = updated;

        //Update parent state
        props.updateQuestion(props.stage, editingQuestions.current.map((elem) => elem.value))
    }

    function AddNewQuestion() {
        const newQuestions = props.questions
        newQuestions.push("")
        props.updateQuestion(props.stage, newQuestions)
    }

    function DeleteQuestion(ind: number) {
        const updatedQuestions = props.questions?.slice(0, ind).concat(props.questions?.slice(ind + 1,))
        props.updateQuestion(props.stage, updatedQuestions)
    }

    return (
        <>
            <div className="w-[450px] mb-10 bg-amber-100 border border-amber-100 p-2 rounded">
                <div className="text-lg mb-2">
                    In {props.stage} Phase<br />
                </div>
                <div tabIndex={0} className="m-5 hover:cursor-pointer bg-amber-200 w-[50px] text-center rounded" onClick={() => { AddNewQuestion() }}>Add</div>
                {props.questions?.map((elem, ind) => {
                    return (
                        <div key={props.stage + ind}>
                            <textarea ref={el => editingQuestions.current[ind] = el as HTMLTextAreaElement} cols={45} rows={2}
                                key={props.stage + ind + "_textarea"}
                                defaultValue={elem}
                                onChange={(e) => handleOnChange(e.target.value, ind)}
                            />
                            <div tabIndex={0} className="m-1 ml-[350px] hover:cursor-pointer bg-red-200 w-[50px] text-center rounded" onClick={()=>DeleteQuestion(ind)}>Delete</div>
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default EditQuestionRow
