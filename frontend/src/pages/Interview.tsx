import logo from 'src/assets/images/logo-universal.png';
import DisplayQuestion from 'src/components/DisplayQuestion';
import { Link, redirect, useSearchParams } from 'react-router-dom';

function Interview() {

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <div className='flex justify-center mt-48'>
                <DisplayQuestion {...{ filePath: searchParams.get("filePath") }} />
            </div>
            <div className='flex justify-center mt-5'>
                <div className='w-36 cursor-pointer
                bg-orange-200 hover:bg-orange-400 
                    rounded border-orange-200 hover:border-orange-400 border-2 
                    p-2 text-center'>
                    <Link to={"/finish"}>Go to finish</Link>
                </div>
            </div>

        </>
    )
}

export default Interview
