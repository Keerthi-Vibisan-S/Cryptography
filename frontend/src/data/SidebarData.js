import * as fa from 'react-icons/fa';
import * as gi from 'react-icons/gi';
import * as bi from 'react-icons/bi';
import * as ai from 'react-icons/ai';

const sidebarData = [
    {
        name: "Encrypt",
        icon: <bi.BiHomeAlt size={24} />,
        link: "/"
    },
    {
        name: "Decrypt",
        icon: <bi.BiBookAdd size={24} />,
        link: "/decrypt"
    },

    {
        name: "Chat",
        icon: <ai.AiOutlineCalendar size={24} />,
        link: "/chat"
    },

    {
        name: "About",
        icon: <fa.FaHandshake size={24} />,
        link: "/about"
    }
];

export default sidebarData;