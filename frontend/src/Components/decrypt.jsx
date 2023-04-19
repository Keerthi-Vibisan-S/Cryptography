import { useState } from "react";
import * as ai from 'react-icons/ai';
import Loading from "./loading";
import ErrToast from "./toast/error";
import Axios from 'axios';
import { decrypt_url } from "../utils/apis";

export default function Decrypt()
{
    const [keyField, setKeyField] = useState(false);
    const [key, setKey] = useState("");
    const [text, setText] = useState("");
    const [dec, setDec] = useState(false);
    const [decText, setDecText] = useState("");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    const decrypt = async () => {
        if(text.trim() != "")
        {
            setLoader(true);
            const data = {
                text: text,
                isKey: keyField,
                key: key

            }
            try{
                const result = await Axios.post(decrypt_url, data);

                setText("");
                setKey("");
                setKeyField(false);
                setDec(!dec);
                setDecText(result.data.decrypted);
            }
            catch(err) {
                //console.log(err);
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 5000);
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
            {error?<ErrToast close={setError} />:""}
            {dec?
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label htmlFor="encText" className="text-3xl mb-4 my-light-clr"><span>Your </span><span className="text-white font-bold ">Decrypted</span> text 
                            <button className="my-brgt-bg font-bold w-fit my-dark-clr ml-4 p-2 text-2xl rounded-md hover:scale-105 hover:bg-white duration-200 text-glitch" onClick={() => navigator.clipboard.writeText(decText)}>
                                <ai.AiFillCopy />
                            </button>
                        </label> 

                        <textarea value={decText} rows="8" className="my-mid-bg p-3 text-white" name="encText" id="encText" readOnly={true}></textarea>
                    </div>
                    <button className="my-brgt-bg font-bold w-fit my-dark-clr mt-5 p-2 text-2xl rounded-md hover:scale-105 hover:bg-white duration-200 text-glitch" onClick={() => {setDecText(""); setDec(!dec)}}>
                        Back
                    </button>
                </div>
                :
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label htmlFor="encText" className="text-3xl mb-4 my-light-clr"><span>Enter text to </span><span className="text-white font-bold ">Decrypt</span></label>
                        <textarea onChange={(e) => setText(e.target.value)} value={text} rows="8" className="my-mid-bg p-3 text-white" name="encText" id="encText"></textarea>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                        <input type="checkbox" className="my-mid-bg text-white mr-2 mt-2" name="keyc" id="keyc" onChange={() => setKeyField(!keyField)}/>
                        <label htmlFor="keyc" className="text-2xl mb-4 my-light-clr"><span>Do you have a key to</span> <span className="text-white font-bold">Decrypt</span></label>
                    </div>

                    {keyField?<div className="mt-2 flex flex-col">
                        <label htmlFor="key" className="text-3xl mb-4 my-light-clr"><span className="text-white font-bold">🗝️Key</span> <span className="text-lg">( * don't forget your key and share only with people who needs to decrypt the message )</span></label>
                        <input type="text" className="my-mid-bg p-3 text-white" name="key" id="key" value={key} onChange={(e) => setKey(e.target.value)}/>
                    </div>
                    :
                    ""
                    }
                    <button className="my-brgt-bg font-bold w-fit my-dark-clr mt-5 p-2 text-2xl rounded-md hover:scale-105 hover:bg-white duration-200 text-glitch" onClick={() => decrypt()}>
                        Decrypt
                    </button>
                </div>
            }
        </section>
       }
      </>
    )
}