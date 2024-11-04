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
        const copy = structuredClone(interviewQuestion as main.Questions)
        copy.Stages[s] = q
        setInterviewQuestion(copy)
    }

    return (
        <>

            <div className="border-2 p-2 bg-amber-50 border-amber-50 w-[600px]">
                <div className="m-2">
                    Editing: "{props.filePath}"
                </div>
                <div className="flex gap-2 justify-center">
                    <div className="cursor-pointer
                    bg-lime-200 hover:bg-lime-400 
                    rounded border-lime-200 hover:border-lime-400 border-2 
                    p-2"
                        onClick={props.setNormalMode}>Top page</div>
                    <div className="cursor-pointer 
                bg-cyan-200 hover:bg-cyan-400 
                rounded border-cyan-200 hover:border-cyan-400 border-2 
                p-2"
                        onClick={SaveQuestion}>Save data</div>
                </div>
                <br />
                <br />
                <div className="flex flex-col items-center">
                    <EditQuestionRow key={"Early"} {...{ stage: "Early", updateQuestion, questions: interviewQuestion?.Stages["Early"] as string[] }} />
                    <EditQuestionRow key={"Middle"} {...{ stage: "Middle", updateQuestion, questions: interviewQuestion?.Stages["Middle"] as string[] }} />
                    <EditQuestionRow key={"Late"} {...{ stage: "Late", updateQuestion, questions: interviewQuestion?.Stages["Late"] as string[] }} />
                </div>
            </div>
        </>

    )
}

export default Edit
