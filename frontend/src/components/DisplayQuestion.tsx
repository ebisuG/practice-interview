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

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setInterviewQuestionIndex(interviewQuestionIndex + 1)
    //     }, 3 * 1000)
    //     return () => clearInterval(intervalId)

    // }, [interviewQuestion, interviewQuestionIndex])

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

    function goNextQuestion() {
        setInterviewQuestionIndex(interviewQuestionIndex + 1)
    }

    return (
        <div id="DisplayQuestion">
            <div className='flex items-center flex-col gap-2'>
                <div className='min-h-7 max-w-[600px] border-2 rounded border-amber-50 bg-amber-50 p-2'>
                    {interviewQuestion[interviewQuestionIndex]}
                </div>
                <div className='w-14 text-center cursor-pointer
                bg-amber-200 hover:bg-amber-400 
                    rounded border-amber-200 hover:border-amber-400 border-2 p-2' onClick={goNextQuestion}>
                    Next
                </div>
            </div>
        </div>
    )
}

export default DisplayQuestion
