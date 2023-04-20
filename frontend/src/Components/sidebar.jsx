import { useState } from "react";
import * as bi from 'react-icons/bi';
import * as ai from 'react-icons/ai';
import sidebarData from "../data/SidebarData";
import {NavLink} from "react-router-dom";

export default function SideBar()
{
    const [isOpen, setIsOpen] = useState(false);

    return(
        <section className="my-light-clr my-dark-bg sticky top-0 shadow-xl flex justify-between items-center">
            {isOpen ? 
                <button onClick={() => setIsOpen(!isOpen)} className="top-5 right-5 fixed w-fit z-10">
                    <ai.AiFillCloseCircle size={32} className = "text-white"/>
                </button>
                : 
                <div className="top-0 left-0 shadow-xl my-dark-bg fixed z-10 p-4 w-full flex justify-between">

                    <h1 className="text-3xl text-glitch">Encrypt and Decrypt</h1>
                    
                    <button onClick={() => setIsOpen(!isOpen)} className="">
                        <bi.BiMenu size={32} className="my-text-black" />
                    </button>
                </div>
            }
            <div className= {`top-0 fixed right-0 my-dark-bg h-screen w-[80vw] lg:w-[20vw] shadow-2xl py-10 text-white ${isOpen? "translate-x-0":"translate-x-full"} ease-in-out duration-300`}>
                <div className="flex justify-center">
                    <h1 className="text-3xl text-glitch my-light-clr p-2">Encrypt & Decrypt</h1>
                </div>
                <div className="mt-5 font-semibold">
                    {sidebarData.map((item, index) => {
                        return(
                            <NavLink onClick={() => {setIsOpen(!isOpen)}} to={item.link} key={index} className={({ isActive }) => (isActive ? "p-3 flex items-center border-b border-b-pink-900 cursor-pointer my-lgt-bg" : "my-light-clr p-3 flex hover:text-white items-center border-b border-b-pink-900 cursor-pointer hover:my-lgt-bg hover:duration-200")} activeclassname="bg-blue-400">
                                {item.icon}
                                <p className="ml-2">{item.name}</p>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}