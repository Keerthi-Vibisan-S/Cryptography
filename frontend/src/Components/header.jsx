import { Link } from "react-router-dom";

export default function Header()
{
    return(
        <section className="my-light-clr p-4 my-dark-bg sticky top-0 shadow-xl flex justify-between items-center">
            <h1 className="text-3xl text-glitch">Encrypt and Decrypt</h1>

            <div className="flex justify-evenly w-[45%] font-semibold text-xl">
                <Link to={"/"}>Encrypt</Link>
                <Link to={"/decrypt"}>Decrypt</Link>
                <Link>Chat</Link>
                <Link>About</Link>
            </div>
        </section>
    )
}