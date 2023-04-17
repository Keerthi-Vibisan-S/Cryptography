import { imgPath } from '../utils/apis';


export default function Loading()
{
    return(
        <section className="absolute my-dark-bg w-[100%] h-[100%] flex flex-col items-center justify-center">
            {/* <ai.AiFillCloud size={60} className="text-blue-600 animate-bounce" /> */}
            <img src = {`${imgPath}loader.gif`} className="w-[15%]" />
            {/* <p className='text-xl'></p> */}
            <p className='my-light-clr mt-2 text-xl font-semibold'>Please Wait - <span className="text-white">Processing your request</span></p>
        </section>
    );
}