import { db } from '../FirebaseConfig';
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

/*export function getOnlyTopic(){
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

export function getOnlyAccount(){
    const read = ref(db,'/Konta');
    var arr = [];
    onValue(read, (snapshot) => {
        var data = snapshot.val();
        for(let i in data){
            if(auth.currentUser.email == data[i].Email){
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
}*/


export function getTopic(){
    const topic = ref(db,'/Tematy');
    const account = ref(db,'/Konta');
    var topicArray = [];
    var accountArray = [];
    var arr = [];
    
    onValue(topic, (snapshot) => {
        snapshot.forEach((res)=>{
            topicArray.push({
                key: res.val().Pisownia,
                desc:  res.val().OpisTematu,
                example: res.val().Przyklady
            })
        })
    });
    
    onValue(account, (snapshot) => {
        var data = snapshot.val();
        for(let i in data){
            if(auth.currentUser.email == data[i].Email){
                for(let x in data[i].PostepTematow){
                    accountArray.push({
                        key:  data[i].PostepTematow[x].Pisownia,
                        progress: data[i].PostepTematow[x].Postep,
                    })    
                }
            }
        }
    });

    accountArray.forEach((acc)=>{
        topicArray.forEach((top)=>{
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
    //console.log(accountArray.length+" / "+ topicArray.length)
    return arr
}

