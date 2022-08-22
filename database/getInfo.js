import { db } from '../FirebaseConfig';
import { ref, set, onValue } from "firebase/database";

function getExistingEmail(email){
    const readData = ref(db,'/Konta')
    var account = false;
    onValue(readData,(snapshot)=>{
        snapshot.val().forEach((res)=>{
            email.toLowerCase() === res.Email.toLowerCase() ? account = !account : null;
        })
    })
    return account
}

export function getInfo(props){
    console.log(getExistingEmail(props))
    return getExistingEmail(props)
}
