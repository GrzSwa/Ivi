import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export function getOnlyTopic(){
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

export function getOnlyAccount(user){
    const read = ref(db,'/Konta');
    var arr = [];
    onValue(read, (snapshot) => {
        var data = snapshot.val();
        for(let i in data){
            if(user == data[i].Email){
                for(let x in data[i].PostepTematow){
                    arr.push({
                        key:data[i].PostepTematow[x].Pisownia,
                        progress:data[i].PostepTematow[x].Postep,
                    })
                    
                }
            }
        }

    });
    //console.log(arr)
    return arr
}

export function getTopic(){
    const topic = getOnlyTopic();
    const account = getOnlyAccount(auth.currentUser.email);
    var arr = [];

    account.forEach((acc)=>{
        topic.forEach((top)=>{
            if(acc.key == top.key){
                arr.push({
                    key:acc.key,
                    desc: top.desc,
                    example:top.example,
                    progress:acc.progress
                })
            }
        })
    })

    return arr
    
}

