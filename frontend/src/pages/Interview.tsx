import DisplayQuestion from 'src/components/DisplayQuestion';
import { Link, redirect, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function Interview() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isFinished, setIsFinished] = useState<boolean>(false)

    return (
        <>
            {isFinished ?
                <>
                    <div className='mt-32 mb-2 text-center'>
                        Finish!
                    </div>
                    <div className='flex justify-center gap-2'>
                        <div className='w-36 cursor-pointer
                bg-amber-200 hover:bg-amber-400 
                    rounded border-amber-200 hover:border-amber-400 border-2 
                    p-2 text-center' onClick={() => setIsFinished(false)}>
                            <div>Restart Interview</div>
                        </div>
                        <Link to={"/"}>
                            <div className='w-36 cursor-pointer
                bg-lime-200 hover:bg-lime-400 
                rounded border-lime-200 hover:border-lime-400 border-2 
                p-2 text-center'>
                                Go to Top
                            </div>
                        </Link>
                    </div>
                </>
                :
                <div className='flex justify-center mt-40'>
                    <DisplayQuestion {...{ filePath: searchParams.get("filePath"), setIsFinished }} />
                </div>
            }

        </>
    )
}

export default Interview
