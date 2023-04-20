import { useEffect, useRef, useState } from "react";
import * as ai from 'react-icons/ai';
import * as bs from 'react-icons/bs';
import * as md from 'react-icons/md';
import Axios from 'axios';
import encryptMessage from "./encryptMessage";
import decryptMessage from "./decryptMessage";
import ErrToast from "../toast/error";

export default function Modal(props) 
{
    const {close, name, chatId, socket} = props;
    const [chat, setChat] = useState([]);
    const [myMsg, setMsg] = useState("");
    const [encrypt, setEncrypt] = useState(false);
    const [key, setKey] = useState("");
    const [toast, setToast] = useState(false);
    const msgBkp = useRef("");
 
    useEffect(() => {
       document.body.style.overflowY="hidden";
    },[])

    useEffect(() => {
        msgBkp.current = [...chat];
        //console.log(msgBkp.current);
    }, [chat]);

    useEffect(() => {
        socket.on("receive-msg", (data) => {
        //console.log(data);
        setChat([...msgBkp.current, {name: data.name, msg: data.msg, encrypt: data.encrypt}]);
        });
    }, [socket]);
    

    const sendMsg = async () => {
        if(myMsg.trim() != "") {
            if(encrypt == true) {
                if(key.trim() != "") {
                    try {
                        let enc_msg = await encryptMessage({text: myMsg, isKey: true, key: key});
                        // console.log("🔑🔑🔑 ", enc_msg);
                        setChat([...chat, {name: name, msg: enc_msg, encrypt: true}]);
                        socket.emit("msg", {name: name, chatId: chatId, msg: enc_msg, encrypt: true});
                    }
                    catch(err) {
                        //! handle error here
                        //console.log(err);
                        setToast(true);
                        setTimeout(() => {
                            setToast(false);
                        }, 5000);
                    }
                }
                else { alert("Encryption mode requires a key"); return;}
            }
            else {
                setChat([...chat, {name: name, msg: myMsg, encrypt: false}]);
                socket.emit("msg", {name: name, chatId: chatId, msg: myMsg, encrypt: false});
            }
            setMsg("");
        }
    }

    //! Decryption Message
    const decryptMsg = async (index) => {
        if(key.trim() != "")
        {
            try {
                chat[index].msg = await decryptMessage({text: chat[index].msg, isKey: true, key: key});
                chat[index].encrypt = false;
                setChat([...chat]);
            }
            catch(err) {
                //! handle error here
                //console.log(err);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                }, 5000);
            }
        }
        else {
            alert("Enter a key in secure mode");
            setEncrypt(true);
        }
    }

    return(
        <div className={`my-lgt-bg whitespace-pre-wrap z-50 text-white modal fade fixed lg:absolute top-[50%] right-[50%] transform translate-x-[50%] translate-y-[-50%] w-[80%]  h-[100vh] lg:h-[90%] outline-none`}>
        {toast?<ErrToast close={setToast} />:""}
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable w-auto pointer-events-none">
            <div className="modal-content border-none relative flex flex-col w-full pointer-events-auto bg-clip-padding rounded-md outline-none text-current overflow-y-scroll">
                <div className="my-dark-bg modal-header sticky top-[-1px] z-10  flex flex-shrink-0 items-center justify-between p-4 shadow-lg">
                    <h5 className="text-2xl font-medium leading-normal">
                        Chat Room
                    </h5>
                    <div className="flex items-center justify-center">
                        <p className="mr-4"><span className="font-bold">Room Id:</span> {chatId}</p>
                        <ai.AiFillCloseCircle size={34} className="text-red-600 cursor-pointer hover:scale-110" onClick={() => {close(false); document.body.style.overflowY="scroll";}}/>
                    </div>
                </div>
                <div className="p-4 h-[73vh]">
                    {console.log("chat: ", chat)}
                    {chat.map((item, key) => {
                        return(
                            <div key={key} className={`group mt-2 w-[100%] my-lgt-bg flex ${item.name==name?"justify-start":"justify-end"}`}>
                                <div className={`${item.encrypt?"bg-black text-white":"bg-white"} w-fit p-2 text-black rounded-md hover:scale-105`}>
                                    <p className="text-sm text-slate-400">~ {item.name}</p>
                                    <p>{item.msg}</p>
                                    {item.encrypt?<button onClick={() => decryptMsg(key)} className="cursor-pointer bg-yellow-400 w-fit px-4 text-black mt-2 rounded-sm">📥 Decrypt</button>:""}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="my-dark-bg p-4 fixed bottom-[-25px] w-[100%] flex  justify-between">
                    <input type="text" value={myMsg} onChange={(e) => setMsg(e.target.value)} className={`my-mid-bg p-3 text-white ${encrypt?"w-[58%]":"w-[78%]"}`} /> 
                    {encrypt?
                    <div className="flex justify-evenly">
                        <input value={key} onChange={(e) => setKey(e.target.value)} type="text" className="my-lgt-bg mx-2 rounded-md p-3" placeholder="Enter your key" id="key" name="key" />
                        <button className="bg-green-500 font-bold w-fit my-dark-clr p-2 px-4 rounded-md hover:scale-105 hover:bg-white duration-200 flex items-center" onClick={() => setEncrypt(false)}>
                            <md.MdEnhancedEncryption size={26} /> <span className="ml-1">Secure</span>
                        </button>
                    </div>
                    :
                    <button className="bg-yellow-500 font-bold w-fit my-dark-clr p-2 px-4 rounded-md hover:scale-105 hover:bg-white duration-200 flex items-center" onClick={() => setEncrypt(true)}>
                        <md.MdNoEncryptionGmailerrorred size={26} /> <span className="ml-1">Default</span>
                    </button>
                    }
                    <button className="my-brgt-bg font-bold w-fit my-dark-clr p-2 px-4 text-2xl rounded-md hover:scale-105 hover:bg-white duration-200 text-glitch" onClick={() => sendMsg()}>
                        <bs.BsFillSendFill />
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}