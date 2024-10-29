import { useEffect, useState } from "react"
import { ReadQuestionFile, WriteQuestionFile } from "../..//wailsjs/go/main/App"
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
            // const data = getEdittingQuestions(result)
            setInterviewQuestion(result)
        })
    }, [])

    // function getEdittingQuestions(q: main.Questions): string[] {
    //     const result: string[] = []

    //     result.push(...(q.Stages["Early"] as string[]))
    //     result.push(...(q.Stages["Middle"] as string[]))
    //     result.push(...(q.Stages["Late"] as string[]))
    //     return result
    // }


    function SaveQuestion() {
        const data :FileToWrite = {filePath:props.filePath, questions:interviewQuestion}
        EventsEmit("writeYaml", [data]);
    }

    function updateQuestion(s: keyof main.Stages, q: string[]) {
        const copy = interviewQuestion as main.Questions
        copy.Stages[s] = q
        setInterviewQuestion(copy)
    }

    return (
        <>
            <div>
                Edit page
                {props.filePath}
                <div className="cursor-pointer" onClick={props.setNormalMode}>Go back to the top page</div>
                <div className="cursor-pointer" onClick={SaveQuestion}>Save data</div>
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
