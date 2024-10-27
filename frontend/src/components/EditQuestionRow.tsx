import { useEffect, useState } from "react"
import { ReadQuestionFile, WriteFile } from "../..//wailsjs/go/main/App"
import { main } from "wailsjs/go/models"

interface props {
    stage: keyof main.Stages
    questions: string[]
    updateQuestion: (s: keyof main.Stages, q: string[]) => void
}

function EditQuestionRow(props: props) {
    const [tempQuestions, setTempQuestions] = useState<string[]>(props.questions)


    // useEffect(() => {
    //     ReadQuestionFile("").then((result) => {
    //         const data = getEdittingQuestions(result)
    //         setInterviewQuestion(data)
    //     })
    // }, [])

    // function getEdittingQuestions(q: main.Questions): string[] {
    //     const result: string[] = []

    //     result.push(...(q.Stages["Early"] as string[]))
    //     result.push(...(q.Stages["Middle"] as string[]))
    //     result.push(...(q.Stages["Late"] as string[]))
    //     return result
    // }


    // function SaveQuestion(){
    //     console.log("save : ", interviewQuestion)
    //     WriteFile(interviewQuestion)
    // }

    return (
        <>
            <div>
                One row for editting
                {props.stage}<br />
                {tempQuestions?.map((elem, ind) => {
                    return <>
                        <div key={elem}>
                            {elem}
                        </div>
                    </>
                })}
            </div>
        </>

    )
}

export default EditQuestionRow
