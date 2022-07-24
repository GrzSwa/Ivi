import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export function getAmountExam(){
    const readData = ref(db,'/Konta');
    var amount = 0;
    onValue(readData,(snapshot)=>{
        var tmp = 0;
        snapshot.forEach((res)=>{
            tmp =  res.val().PostepTematow.length
        })
        amount = tmp;
    })
    return amount
}