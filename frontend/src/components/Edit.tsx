import { useEffect, useState } from "react"
import { ReadQuestionFile, WriteFile } from "../..//wailsjs/go/main/App"
import { main } from "wailsjs/go/models"
import EditQuestionRow from "./EditQuestionRow"

interface props {
    filePath: string
    setNormalMode: () => void
}

function Edit(props: props) {
    const [interviewQuestion, setInterviewQuestion] = useState<main.Questions | null>(null)


    useEffect(() => {
        ReadQuestionFile("").then((result) => {
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
        console.log("save : ", interviewQuestion)
        WriteFile([interviewQuestion])
    }

    function updateQuestion(s: keyof main.Stages, q: string[]) {
        const copy = interviewQuestion as main.Questions
        copy.Stages[s] = q
        setInterviewQuestion(copy)
    }

    return (
        <>
            Edit page
            {props.filePath}
            <button onClick={props.setNormalMode}>Go back to the top page</button>
            <button onClick={SaveQuestion}>Save data</button>
            <br />
            <br />
            <EditQuestionRow {...{ stage: "Early", questions: interviewQuestion?.Stages["Early"] as string[], updateQuestion }} />
            <br />
            <br />
            <EditQuestionRow {...{ stage: "Middle", questions: interviewQuestion?.Stages["Middle"] as string[], updateQuestion }} />
            <br />
            <br />
            <EditQuestionRow {...{ stage: "Late", questions: interviewQuestion?.Stages["Late"] as string[], updateQuestion }} />
        </>

    )
}

export default Edit
