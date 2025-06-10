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

export function setNext(next: Date){
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", " Sep", "Oct", "Nov", "Dec"];
    document.cookie = `nextDate=${next.getDate()} ${month[next.getMonth()]} ${next.getFullYear()}`
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

export function clearCookie(){
    document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    });
}