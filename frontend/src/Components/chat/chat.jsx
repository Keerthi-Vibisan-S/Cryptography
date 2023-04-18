import { io } from 'socket.io-client';
import { server } from '../../utils/apis';
import { useEffect } from 'react';

// const socket = io.connect(server);

export default function Chat() {
    useEffect(() => {
        const s = io(server);
        //console.log(s);

        //? Clean Up Function
        return () => {
          s.disconnect()
        }
      }, []);

    return (
    <section className="my-dark-bg p-8 pt-4 min-h-[100vh]">
        <input type="text" />
        <button></button>
    </section>
    );
}