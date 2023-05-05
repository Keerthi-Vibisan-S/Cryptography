import * as fa from 'react-icons/fa';
import * as gi from 'react-icons/gi';
import * as bi from 'react-icons/bi';
import * as ai from 'react-icons/ai';

const sidebarData = [
    {
        name: "Encrypt",
        icon: <ai.AiFillLock size={24} />,
        link: "/"
    },
    {
        name: "Decrypt",
        icon: <ai.AiFillUnlock size={24} />,
        link: "/decrypt"
    },

    {
        name: "Chat",
        icon: <ai.AiOutlineWechat size={24} />,
        link: "/chat"
    },

    {
        name: "About",
        icon: <ai.AiOutlineQuestionCircle size={24} />,
        link: "/about"
    }
];

export default sidebarData;