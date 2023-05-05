import { decrypt_url } from "../../utils/apis";
import Axios  from "axios";

export default function decryptMessage(data)
{
    console.log(data);
    return new Promise((async (resolve, reject) => {      
        try{
            console.log(data);
            const result = await Axios.post(decrypt_url, data);
            // console.log("REsult: ", result);
            resolve(result.data.decrypted);
        }
        catch(err) {
            console.log(err);
            reject(err);
        }
    }))
}