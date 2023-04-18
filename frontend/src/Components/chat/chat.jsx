import socketIOClient from "socket.io-client";
import { server } from '../../utils/apis';
import { useEffect, useState } from 'react';

const socket = socketIOClient(server);

export default function Chat() {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket server!");
        });

        socket.on("rec-msg", (data) => {
            alert(data.msg);
            // console.log("Connected to socket server!");
        });
    }, [socket]);

    const joinChat = () => {
        socket.emit("join-room", {name: name, chatId: chatId});
    }

    const [name, setName] = useState("");
    const [chatId, setChatId] = useState("");
    const [msg, setMsg] = useState("");

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
            <input type="text" onChange={(e) => setMsg(e.target.value)}/>
            <button className="bg-white" onClick={() => sendMsg()}>Send msg</button>
        </section>
    );
}