import { useState } from "react";
import Axios from 'axios';
import { encrypt_url } from '../utils/apis';
import * as ai from 'react-icons/ai';
import Loading from "./loading";

export default function Encrypt()
{
    const [keyField, setKeyField] = useState(false);
    const [key, setKey] = useState("");
    const [text, setText] = useState("");
    const [enc, setEnc] = useState(false);
    const [encText, setEncText] = useState("");
    const [loader, setLoader] = useState(false);

    const encrypt = async () => {
        if(text.trim() != "")
        {
            setLoader(true);
            const data = {
                text: text,
                isKey: keyField,
                key: key

            }
            
            const result = await Axios.post(encrypt_url, data);

            if(result.status == 200)
            {
                setText("");
                setKey("");
                setKeyField(false);
                setEnc(!enc);
                setEncText(result.data.encrypted);
            }
            else {
                //! Error Disply Here
            }
            setLoader(false);
        }
        else {
            alert("Enter text to decrypt");
        }
    }

    return (
      <>
         {loader?<Loading />: 
         <section className="my-dark-bg p-8 pt-4 min-h-[100vh]">
            {enc?
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label htmlFor="encText" className="text-3xl mb-4 my-light-clr"><span>Your </span><span className="text-white font-bold ">Encrypted</span> text 
                            <button className="my-brgt-bg font-bold w-fit my-dark-clr ml-4 p-2 text-2xl rounded-md hover:scale-105 hover:bg-white duration-200 text-glitch" onClick={() => navigator.clipboard.writeText(encText)}>
                                <ai.AiFillCopy />
                            </button>
                        </label> 

                        <textarea value={encText} rows="8" className="my-mid-bg p-3 text-white" name="encText" id="encText" readOnly={true}></textarea>
                    </div>
                    <button className="my-brgt-bg font-bold w-fit my-dark-clr mt-5 p-2 text-2xl rounded-md hover:scale-105 hover:bg-white duration-200 text-glitch" onClick={() => {setEncText(""); setEnc(!enc)}}>
                        Back
                    </button>
                </div>
                :
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label htmlFor="encText" className="text-3xl mb-4 my-light-clr"><span>Enter text to </span><span className="text-white font-bold ">Encrypt</span></label>
                        <textarea onChange={(e) => setText(e.target.value)} value={text} rows="8" className="my-mid-bg p-3 text-white" name="encText" id="encText"></textarea>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                        <input type="checkbox" className="my-mid-bg text-white mr-2 mt-2" name="key" id="key" onChange={() => setKeyField(!keyField)}/>
                        <label htmlFor="key" className="text-2xl mb-4 my-light-clr"><span>Want to <span className="text-white font-bold">Encrypt</span> with your <span className="text-white font-bold">Own Key</span> </span></label>
                    </div>

                    {keyField?<div className="mt-2 flex flex-col">
                        <label htmlFor="key" className="text-3xl mb-4 my-light-clr"><span className="text-white font-bold">🗝️Key</span> <span className="text-lg">( * don't forget your key and share only with people who needs to decrypt the message )</span></label>
                        <input type="text" className="my-mid-bg p-3 text-white" name="key" id="key" value={key} onChange={(e) => setKey(e.target.value)}/>
                    </div>
                    :
                    ""
                    }
                    <button className="my-brgt-bg font-bold w-fit my-dark-clr mt-5 p-2 text-2xl rounded-md hover:scale-105 hover:bg-white duration-200 text-glitch" onClick={() => encrypt()}>
                        Encrypt
                    </button>
                </div>
            }
        </section>
       }
      </>
    )
}