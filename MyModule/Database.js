import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";

export function getTopic(){
    const read = ref(db,'/Tematy');
    var arr = [];
    onValue(read, (snapshot) => {
        snapshot.forEach((res)=>{
            arr.push({
                key:res.val().Pisownia,
                desc: res.val().OpisTematu,
                example:res.val().Przyklady
            })
            //console.log(res.val());
        })
    });
    return arr
}

export function getAccount(user){
    const read = ref(db,'/Konta');
    var arr = [];
    onValue(read, (snapshot) => {
        snapshot.forEach((res)=>{
            if(user == res.val().Email){
                arr.push({
                    key:res.val().Pisownia,
                    progress:res.val().Postep
                })
            }
        })
    });
    return arr
}

export function getAllInfoOfTopic(user){
    const topic = getTopic();
    const account = getAccount(user);
    var arr = [];
    
}

