import { imgPath } from "../utils/apis";

export default function About()
{
    return (
        <section className="my-dark-bg p-8 pt-4 min-h-[100vh] text-white text-xl">
            <h1 className="text-4xl my-light-clr font-bold">About</h1>
            <p className="mt-2">We use <span className="my-light-clr font-semibold">AES-256-CBC</span> for encryption, which is a highly secure encryption algorithm that uses a 256-bit key length and Cipher Block Chaining (CBC) mode of operation. This algorithm provides a high level of encryption, making it nearly impossible for unauthorized parties to access the encrypted data. </p>
            <p className="mt-2 my-lgt-bg p-4">We have choose CBC - Cipher Block Chaining mode because this ensures no block get same encryption result of cipher text.</p>
            <p className="text-3xl font-bold mt-6">Working of <span className="my-light-clr">CBC</span></p>
            <img src={`${imgPath}cbc.png`} className="mt-4" />
            <p className="mt-2">So initially to encrypt we mix the plain text with Initialization Vector from a random generated, for next block the previous result Cipher text acts as Initialization Vector. This ensures no block get same encryption result.</p>
        </section>
    );
}