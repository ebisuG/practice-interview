import { useEffect, useState } from "react"
import { ReadQuestionFile } from "../..//wailsjs/go/main/App"
import { main } from "wailsjs/go/models"
import { EventsEmit } from "wailsjs/runtime/runtime"
import EditQuestionRow from "./EditQuestionRow"

interface props {
    filePath: string
    setNormalMode: () => void
}

interface FileToWrite {
    filePath: string
    questions: main.Questions | null
}

function Edit(props: props) {
    const [interviewQuestion, setInterviewQuestion] = useState<main.Questions | null>(null)


    useEffect(() => {
        ReadQuestionFile(props.filePath).then((result) => {
            setInterviewQuestion(result)
        })
    }, [])

    function SaveQuestion() {
        const data: FileToWrite = { filePath: props.filePath, questions: interviewQuestion }
        EventsEmit("writeYaml", [data]);
    }

    function updateQuestion(s: keyof main.Stages, q: string[]) {
        const copy = interviewQuestion as main.Questions
        copy.Stages[s] = q
        setInterviewQuestion(copy)
    }

    return (
        <>
            <div className="border-2 p-2 bg-slate-100 border-slate-100">
                Editing: "{props.filePath}"
                <div className="flex gap-2 justify-center">
                    <div className="cursor-pointer 
                    bg-lime-200 hover:bg-lime-400 
                    rounded border-lime-200 hover:border-lime-400 border-2 
                    p-2"
                        onClick={props.setNormalMode}>Go back to the top page</div>
                    <div className="cursor-pointer 
                bg-orange-200 hover:bg-orange-400 
                    rounded border-orange-200 hover:border-orange-400 border-2 
                    p-2"
                        onClick={SaveQuestion}>Save data</div>
                </div>
                <br />
                <br />
                <EditQuestionRow {...{ stage: "Early", questions: interviewQuestion?.Stages["Early"] as string[], updateQuestion }} />
                <br />
                <br />
                <EditQuestionRow {...{ stage: "Middle", questions: interviewQuestion?.Stages["Middle"] as string[], updateQuestion }} />
                <br />
                <br />
                <EditQuestionRow {...{ stage: "Late", questions: interviewQuestion?.Stages["Late"] as string[], updateQuestion }} />
            </div>
        </>

    )
}

export default Edit
