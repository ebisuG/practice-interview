import { useEffect, useState } from 'react';
import { main } from "../../wailsjs/go/models"
import { ReadQuestionFile } from '../../wailsjs/go/main/App';

interface props {
    filePath: string | null
    setIsFinished: React.Dispatch<React.SetStateAction<boolean>>
}

function DisplayQuestion(props: props) {
    const [interviewQuestion, setInterviewQuestion] = useState<string[]>([])
    const [interviewQuestionIndex, setInterviewQuestionIndex] = useState<number>(0)

    useEffect(() => {
        if (props.filePath != null) {
            ReadQuestionFile(props.filePath).then((result) => {
                const data = getInterviewQuestions(result)
                setInterviewQuestion(data)
                if (data.length == 0) {
                    props.setIsFinished(true)
                }
            })
        }
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setInterviewQuestionIndex(interviewQuestionIndex + 1)
        }, 3 * 1000)
        return () => clearInterval(intervalId)

    }, [interviewQuestion, interviewQuestionIndex])

    useEffect(() => {
        if (interviewQuestionIndex == interviewQuestion.length && interviewQuestionIndex != 0) {
            props.setIsFinished(true)
        }
    }, [interviewQuestionIndex])

    function getInterviewQuestions(q: main.Questions): string[] {
        const result: string[] = []

        result.push(...(q.Stages["Early"] as string[]))
        result.push(...(q.Stages["Middle"].sort((a, b) => 0.5 - Math.random()) as string[]))
        result.push(...(q.Stages["Late"].sort((a, b) => 0.5 - Math.random()) as string[]))
        return result
    }

    return (
        <div id="DisplayQuestion">
            <div className='min-h-7'>
                {interviewQuestion[interviewQuestionIndex]}
            </div>
        </div>
    )
}

export default DisplayQuestion
