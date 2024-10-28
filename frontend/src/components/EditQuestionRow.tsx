import { useRef, useState } from "react"
import { main } from "wailsjs/go/models"

interface props {
    stage: keyof main.Stages
    questions: string[]
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

    return (
        <>
            <div>
                One row for editting<br />
                {props.stage}<br />
                {props.questions?.map((elem, ind) => {
                    return (
                        <div key={elem}>
                            <textarea ref={el => editingQuestions.current[ind] = el as HTMLTextAreaElement} cols={40} rows={2}
                                key={ind}
                                defaultValue={elem}
                                onChange={(e) => handleOnChange(e.target.value, ind)}
                            />
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default EditQuestionRow
