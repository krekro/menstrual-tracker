import { getCookie } from "./cookies";

export function reload(id: string){
    const element = document.getElementById(id);
    if(element){
        const content = element.innerHTML;
        element.innerHTML = content
    }else{
        console.log("Failed to reload, target element not found");
    }
}

export function updateDate() {
    const element = document.getElementById("nextDate");
    const element2 = document.getElementById("avg");
    if (element) {
      element.innerHTML = getCookie("nextDate");
      console.log(getCookie("nextDate"))
    }
    if (element2){
        element2.innerHTML = `Average: ${getCookie("avg")} days`
    }
  }