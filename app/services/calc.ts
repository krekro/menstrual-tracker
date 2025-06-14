import type { record } from "~/types/data";
import { setNext, setAvg, set6Forcast, setAvgLen } from "./cookies";
import { updateDate } from "./dom";

export function updatePredictCard(data: record[]) {
    let sum = 0; //for startdate
    let sum2 = 0; //for avg period length
    let avg = 0;
    let avgLength = 0;
    let tempDate: Date;
    let forcast: Date[] = new Array(6);

    //Calculate avg startdate and avg period length
    for(let i=0;i<data.length-1;i++){
        sum += data[i].startDate.getTime() - data[i+1].startDate.getTime();
        sum2 += data[i].endDate.getTime() - data[i].startDate.getTime();
    }
    avg = sum/(1000*60*60*24)/(data.length-1);
    avgLength = sum2/(1000*60*60*24)/(data.length-1);

    //Calculate Next Start Date
    const nextDate = new Date(data[0].startDate.getTime() + avg * 1000 * 60 * 60 * 24);

    //Calculate predicted start date for next 6months after next start date
    for(let i=0;i<6;i++){
        tempDate = new Date(nextDate.getTime() + (avg * 1000 * 60 * 60 * 24 * (i+1)));
        forcast[i] = tempDate;
    }

    console.log(`avg: ${avg}`)

    //Store value in Cookies
    setNext(nextDate);
    setAvg(avg);
    setAvgLen(avgLength);
    set6Forcast(forcast);

    //Update DOM once values are stored in Cookies
    updateDate();
}