import { useEffect, useState } from "react";
import * as ai from 'react-icons/ai';
import * as bs from 'react-icons/bs';

export default function Modal(props) 
{
    const {close} = props;
 
    useEffect(() => {
       document.body.style.overflowY="hidden";
    })
    
    const [chat, setChat] = useState([
        {msg: "hi", name:"Person 1"},
        {msg: "hello", name:"Person 2"},
        {msg: "hello", name:"Person 2"},
        {msg: "hello", name:"Person 2"},
        {msg: "hello", name:"Person 2"},
        {msg: "hello", name:"Person 2"},
        {msg: "hello", name:"Person 2"},

        {msg: "hello", name:"Person 2"},{msg: "hello", name:"Person 2"},
    ]);
    const [myMsg, setMsg] = useState("");

    const sendMsg = () => {
        if(myMsg.trim() != "") {
            setChat([...chat, {name: "mine", msg: myMsg}]);
            //! We must also send chat to socket So everyone can receive
        }
    }

    return(
        <div className={`my-lgt-bg whitespace-pre-wrap z-50 text-white modal fade fixed lg:absolute top-[50%] right-[50%] transform translate-x-[50%] translate-y-[-50%] w-[80%] overflow-y-scroll h-[100vh] lg:h-[90%] outline-none`}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable w-auto pointer-events-none">
            <div className="modal-content border-none h-[100%] relative flex flex-col w-full pointer-events-auto bg-clip-padding rounded-md outline-none text-current">
                <div className="my-dark-bg modal-header sticky top-0 z-10  flex flex-shrink-0 items-center justify-between p-4 shadow-lg rounded-t-md">
                    <h5 className="text-2xl font-medium leading-normal">
                        Chat Room
                    </h5>
                    <div className="flex items-center justify-center">
                        <p className="mr-4">Room Id: 1234</p>
                        <ai.AiFillCloseCircle size={34} className="text-red-600 cursor-pointer hover:scale-110" onClick={() => {close(false); document.body.style.overflowY="scroll";}}/>
                    </div>
                </div>
                <div className="p-4">
                    {chat.map((item, key) => {
                        return(
                            <div key={key} className={`mt-2 w-[100%] my-lgt-bg flex ${item.name=="mine"?"justify-start":"justify-end"}`}>
                                <div className={`bg-white w-fit p-2 text-black rounded-md hover:scale-105`}>
                                    <p className="text-sm text-slate-400">~ {item.name}</p>
                                    <p>{item.msg}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="my-dark-bg p-4 sticky bottom-[-1px] w-[100%] flex justify-between">
                    <input type="text" value={myMsg} onChange={(e) => setMsg(e.target.value)} className="my-mid-bg p-3 text-white w-[93%]" /> 
                    <button className="my-brgt-bg font-bold w-fit my-dark-clr p-2 px-4 text-2xl rounded-md hover:scale-105 hover:bg-white duration-200 text-glitch" onClick={() => sendMsg()}>
                        <bs.BsFillSendFill />
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}