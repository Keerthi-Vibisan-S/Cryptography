export default function Header()
{
    return(
        <section className="my-light-clr p-4 my-dark-bg sticky top-0 shadow-xl flex justify-between items-center">
            <h1 className="text-3xl text-glitch">Encrypt and Decrypt</h1>

            <div className="flex justify-evenly w-[45%] font-semibold text-xl">
                <div>Encrypt</div>
                <div>Decrypt</div>
                <div>Chat</div>
                <div>About</div>
            </div>
        </section>
    )
}