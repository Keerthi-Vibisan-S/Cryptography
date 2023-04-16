import { useState } from "react"

export default function Encrypt()
{
    const [key, setKey] = useState(false);

    const changeStateKey = () => {
        setKey(!key);
    }

    return (
        <section className="my-dark-bg p-8 pt-4 min-h-[100vh]">
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <label htmlFor="encText" className="text-3xl mb-4 my-light-clr"><span>Enter text to </span><span className="text-white font-bold ">Encrypt</span></label>
                    <textarea rows="8" className="my-mid-bg p-3 text-white" name="encText" id="encText"></textarea>
                </div>
                
                <div className="mt-4 flex justify-center">
                    <input type="checkbox" className="my-mid-bg text-white mr-2 mt-2" name="key" id="key" onChange={() => changeStateKey()}/>
                    <label htmlFor="key" className="text-2xl mb-4 my-light-clr"><span>Want to <span className="text-white font-bold">Encrypt</span> with your <span className="text-white font-bold">Own Key</span> </span></label>
                </div>

                {key?<div className="mt-2 flex flex-col">
                    <label htmlFor="encText" className="text-3xl mb-4 my-light-clr"><span className="text-white font-bold">🗝️Key</span> <span className="text-lg">( * don't forget your key and share only with people who needs to decrypt the message )</span></label>
                    <input type="text" className="my-mid-bg p-3 text-white" name="decText" id="decText"/>
                </div>
                :
                ""
                }
                <button className="my-brgt-bg font-bold w-fit my-dark-clr mt-5 p-2 text-2xl rounded-md hover:scale-105 hover:bg-white duration-200 text-glitch">
                    Encrypt
                </button>
            </div>
        </section>
    )
}