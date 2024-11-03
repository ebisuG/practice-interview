import DisplayQuestion from 'src/components/DisplayQuestion';
import { Link, redirect, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function Interview() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isFinished, setIsFinished] = useState<boolean>(false)

    return (
        <>
            {isFinished ?
                <div className='flex justify-center mt-5 gap-2'>
                    <div className='w-36 cursor-pointer
                bg-orange-200 hover:bg-orange-400 
                    rounded border-orange-200 hover:border-orange-400 border-2 
                    p-2 text-center'>
                        <div onClick={() => setIsFinished(false)}>Restart Interview</div>
                    </div>
                    <div className='w-36 cursor-pointer
                bg-lime-200 hover:bg-lime-400 
                    rounded border-lime-200 hover:border-lime-400 border-2 
                    p-2 text-center'>
                        <Link to={"/"}>Go to Top</Link>
                    </div>
                </div>
                :
                <div className='flex justify-center mt-48'>
                    <DisplayQuestion {...{ filePath: searchParams.get("filePath"), setIsFinished }} />
                </div>
            }

        </>
    )
}

export default Interview
