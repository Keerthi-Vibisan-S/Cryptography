import socketIOClient from "socket.io-client";
import { server } from '../../utils/apis';
import { useEffect, useState } from 'react';
import Modal from "./modal";
import ChatFormToast from "../toast/chatForm";

const socket = socketIOClient(server);

export default function Chat() {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket server!");
        });
    }, [socket]);

    const joinChat = () => {
        if(name.trim()!="" && chatId.trim()!="") {
            socket.emit("join-room", {name: name, chatId: chatId});
            setChatWindow(true);
            console.log("Setting");
        }
        else {
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 5000);
        }
    }

    const [chatWindow, setChatWindow] = useState(false);
    const [name, setName] = useState("");
    const [chatId, setChatId] = useState("");
    const [msg, setMsg] = useState("");
    const [toast, setToast] = useState(false);

    const sendMsg = () => {
        socket.emit("msg", {chatId: chatId, msg: msg});
    }

    return (
        <section className="my-dark-bg p-8 pt-4 min-h-[100vh]">
            {/* <h1 className="text-3xl text-white">Chat as Anonymous</h1> */}
            <div className="flex flex-col items-center">
                <input type="text" className="my-mid-bg p-3 text-white" name="key" id="key" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" value={chatId} onChange={(e) => setChatId(e.target.value)} className="my-mid-bg mt-3 p-3 text-white" name="key" id="key" placeholder="Chat ID" />
                <button className="my-brgt-bg font-bold w-fit my-dark-clr mt-5 p-2 text-2xl rounded-md hover:scale-105 hover:bg-white duration-200 text-glitch" onClick={() => joinChat()}>
                    Start
                </button>
            </div>
            {chatWindow?<Modal close={setChatWindow} name={name} chatId={chatId} socket={socket} />:""}
            {toast?<ChatFormToast close={setToast} />:""}
        </section>
    );
}