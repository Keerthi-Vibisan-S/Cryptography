import { useState } from "react"

export default function Decrypt()
{
    const [keyField, setKeyField] = useState(false);

    return (
        <section className="my-dark-bg p-8 pt-4 min-h-[100vh]">

            <div className="flex flex-col">
                <div className="flex flex-col">
                    <label htmlFor="encText" className="text-3xl mb-4 my-light-clr"><span>Enter text to </span><span className="text-white font-bold ">Decrypt</span></label>
                    <textarea rows="8" className="my-mid-bg p-3 text-white" name="encText" id="encText"></textarea>
                </div>
                
                <div className="mt-4 flex justify-center">
                    <input type="checkbox" className="my-mid-bg text-white mr-2 mt-2" name="key" id="key" onChange={() => setKeyField(!keyField)}/>
                    <label htmlFor="key" className="text-2xl mb-4 my-light-clr"><span>Do you have a <span className="text-white font-bold">Key</span> to <span className="text-white font-bold">Decrypt</span> </span></label>
                </div>

                {keyField?<div className="mt-2 flex flex-col">
                    <label htmlFor="encText" className="text-3xl mb-4 my-light-clr"><span className="text-white font-bold">🗝️Key</span> <span className="text-lg">( * do not share this key )</span></label>
                    <input type="text" className="my-mid-bg p-3 text-white" name="decText" id="decText"/>
                </div>
                :
                ""
                }
                <button className="my-brgt-bg font-bold w-fit my-dark-clr mt-5 p-2 text-2xl rounded-md hover:scale-105 hover:bg-white duration-200 text-glitch">
                    Decrypt
                </button>
            </div>
        </section>
    )
}