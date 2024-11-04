import { useRef } from "react"
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
        props.updateQuestion(props.stage, editingQuestions?.current.map((elem) => elem?.value))
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
                <div className="flex mb-2">
                    <div className="text-lg">
                        In {props.stage} Phase<br />
                    </div>
                    <div tabIndex={0} className="ml-2 hover:cursor-pointer bg-amber-200 hover:bg-amber-400 w-[50px] text-center rounded" onClick={() => { AddNewQuestion() }}>Add</div>
                </div>
                {props.questions?.map((elem, ind) => {
                    return (
                        <div key={props.stage + ind} className="flex gap-2">
                            <div>
                                <textarea className="p-1" ref={el => editingQuestions.current[ind] = el as HTMLTextAreaElement} cols={40} rows={2}
                                    key={props.stage + ind + "_textarea"}
                                    defaultValue={elem}
                                    onChange={(e) => handleOnChange(e.target.value, ind)}
                                />
                            </div>
                            <div tabIndex={0} className="mt-5 hover:cursor-pointer bg-red-200 hover:bg-red-400 w-[50px] text-center text-sm pt-1 h-7 rounded" onClick={() => DeleteQuestion(ind)}>Delete</div>
                        </div>
                    )
                })}
            </div>
        </>

    )
}

export default EditQuestionRow
