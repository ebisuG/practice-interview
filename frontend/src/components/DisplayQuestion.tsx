import { useEffect, useState } from 'react';
import { main } from "../../wailsjs/go/models"
import { StartInterview } from '../../wailsjs/go/main/App';

function DisplayQuestion() {
    let shouldUpdate = true
    // const [allQuestions, setAllQuestions] = useState<main.Questions | null>(null)
    // const [question, setQuestion] = useState<string>()
    const [interviewQuestion, setInterviewQuestion] = useState<string[]>([])
    const [interviewQuestionIndex, setInterviewQuestionIndex] = useState<number>(0)
    // const updateQuestions = (yml: main.Questions) => setAllQuestions(yml)

    useEffect(() => {
        StartInterview("").then((result) => {
            const data = getInterviewQuestions(result)
            setInterviewQuestion(data)
        })
    }, [])

    useEffect(() => {
        let intervalId: number
        if (interviewQuestion.length != 0) {
            intervalId = setInterval(() => {
                setInterviewQuestionIndex(interviewQuestionIndex + 1)
            }, 3 * 1000)
        }
        return () => clearInterval(intervalId)

    }, [interviewQuestion, interviewQuestionIndex])

    function getInterviewQuestions(q: main.Questions): string[] {
        const result: string[] = []

        result.push(...(q.Stages["Early"] as string[]))
        result.push(...(q.Stages["Middle"].sort((a, b) => 0.5 - Math.random()) as string[]))
        result.push(...(q.Stages["Late"].sort((a, b) => 0.5 - Math.random()) as string[]))
        setInterviewQuestion(result)
        return result
    }

    return (
        <div id="DisplayQuestion">
            <div>
                Question from interviewe is : {interviewQuestion[interviewQuestionIndex]}
            </div>
        </div>
    )
}

export default DisplayQuestion
