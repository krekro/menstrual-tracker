export function setLogin(uid: string, isLogin: string, session_id: string){
    document.cookie = `uid=${uid}`
    document.cookie = `isLogin=${isLogin}`
    document.cookie = `session_id=${session_id}`
}

export function setStart(date: string){
    document.cookie = `startDate=${date}`
}

export function setEnd(date: string){
    document.cookie = `endDate=${date}`
}

export function clearDate(){
    document.cookie = `startDate=`
    document.cookie = `endDate=`
}

export function setAvg(avg: number){
    document.cookie = `avg=${avg.toFixed(0)}`;

}

export function setAvgLen(avgLen: number){
    document.cookie = `avgLen=${avgLen.toFixed(0)}`;
}

export function setNext(next: Date){
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", " Sep", "Oct", "Nov", "Dec"];
    document.cookie = `nextDate=${next.getDate()} ${month[next.getMonth()]} ${next.getFullYear()}`
}

export function set6Forcast(arr: Date[]){
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", " Sep", "Oct", "Nov", "Dec"];
    for(let i=0; i<arr.length; i++){
        document.cookie = `forcast_${i+1}=${arr[i].getDate()} ${month[arr[i].getMonth()]} ${arr[i].getFullYear()}`
    }
}

export function setCollapse(display: string){
    document.cookie = `collapse=${display}`;
}

export function getCookie(key: string){
    try{    
        let cookieMap = new Map();
        let result: string;
        const cookie = document.cookie;
        cookie.split("; ").map((item)=>{
            cookieMap.set(item.split("=")[0], item.split("=")[1])
        })
        //console.log(document.cookie)
        console.log(cookieMap)
        result = cookieMap.get(key);
        return result;
    } 
    catch (e){
        const message = e 
        throw new Error(`error at getCookie: ${message}`)
    }

}

export function clearAllCookie(){
    document.cookie = `isLogin=false`;
    document.cookie = `nextDate=No Data`;
    document.cookie = `session_id=null`;
    document.cookie = `uid=null`;
    document.cookie = `avg=No Data`;
    document.cookie = `avgLen=No Data`;
    document.cookie = `startDate=0`;
    document.cookie = `endDate=0`;
    for(let i=0; i<6; i++){
        document.cookie = `forcast_${i+1}=0`
    }
}

export function clearCookie2(){
    document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    });
}