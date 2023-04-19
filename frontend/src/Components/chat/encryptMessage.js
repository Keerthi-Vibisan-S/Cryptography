import { encrypt_url } from "../../utils/apis";
import Axios  from "axios";

export default function encryptMessage(data)
{
    return new Promise((async (resolve, reject) => {      
        try{
            console.log(data);
            const result = await Axios.post(encrypt_url, data);
            console.log("REsult: ", result);
            resolve(result.data.encrypted);
        }
        catch(err) {
            console.log(err);
            reject(err);
        }
    }))
}