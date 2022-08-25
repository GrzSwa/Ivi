import { db } from '../FirebaseConfig';
import { ref, set, onValue } from "firebase/database";

export function getAmountUser(){
    const readData = ref(db,'/')
    var amount = undefined;
    var arr = [];
    onValue(readData,(snapshot)=>{
        amount = snapshot.val()['Konta'].length;
        for(let j in snapshot.val()['Tematy']){
            arr.push({
                Pisownia: snapshot.val()['Tematy'][j].Pisownia,
                Postep:0,
                IloscProb:0,
                Bledy:0,
                wynik:0,
                OstatniaProba:0

            })
        }
    })
    return {topicImprove: arr, newUserDatabaseSpace:amount}
}

function writeUserData(userNumber,email,topicImprove) {
    set(ref(db, '/Konta/' + userNumber), {
        Email: email,
        NajlepszyCzas: "-",
        NajlepszyTemat : "-",
        Strike: 0,
        PostepTematow: topicImprove
    })
}

export function newUser(email){
    const result = getAmountUser();
    writeUserData(result.newUserDatabaseSpace,email,result.topicImprove);
}
