import type { record } from "~/types/data";
import { setNext, setAvg } from "./cookies";
import { updateDate } from "./dom";

export function AvgCycle(data: record[]) {
    let sum = 0;
    let avg = 0;

    for(let i=0;i<data.length-1;i++){
        sum += data[i].startDate.getTime() - data[i+1].startDate.getTime();
    }
    avg = sum/(1000*60*60*24)/(data.length-1);
    const nextDate = new Date(data[0].startDate.getTime() + avg * 1000 * 60 * 60 * 24);

    console.log(`avg: ${avg}`)
    setNext(nextDate);
    setAvg(avg);
    updateDate();
}