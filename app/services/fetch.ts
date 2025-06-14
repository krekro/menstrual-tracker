import type { UUIDTypes } from "uuid";
import { getKey } from "~/services/api";
import type { record } from "~/types/data";
import { setAvg, setNext } from "./cookies";
import { updateDate } from "./dom";
import { updatePredictCard } from "./calc";

function apiURL(){
   return getKey("prod");
}

export async function fetchRecords(uid: string, session_id: string): Promise<record[]> {
    const thisYear = new Date().getFullYear();
    let sum = 0, avg = 0;
    const queryParams =
        `uid=${uid}&` +
        `session_id=${session_id}`;
    const URL = apiURL();
    try {
        const response = await fetch(`${URL}/menstrual/records?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors", // Change this to "cors" for handling cross-origin requests
        });

        if (response.status == 401){
            alert("Invalid Session");
        }

        if (!response.ok) {
            console.error("Failed to fetch records");
            return [];
        }

        const body = await response.json();
        const data: record[] = body.records.map((item: any) => ({
            id: item.id,
            uid: item.uid,
            createDate: new Date(item.create_date),
            note: item.note,
            startDate: new Date(item.start_date),
            endDate: new Date(item.end_date),
        }));
        updatePredictCard(data);
        //console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching records:", error);
        return [];
    }
}

export async function deleteRecord(uid: string, session_id: string, id:string){
    const URL = apiURL();
    const qeuryParams =
      `uid=${uid}` +
      `&session_id=${session_id}` +
      `&id=${id}`;
    try {
      fetch(`${URL}/menstrual/records?${qeuryParams}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {

        if (response.status == 401){
            alert("Invalid Session");
             window.location.reload();
        }
          alert("Internal server error, please try again.");
          window.location.reload();
          return;
        }
      });
    } catch (error) {
      alert("Error, please retry delete operation again.");
    }
}

export async function addRecord(uid: string, session_id: string, startDate: string | undefined, endDate: string | null) {
    const URL = apiURL();
    const body = {
        uid: uid,
        session_id: session_id,
        start_date: startDate,
        end_date: endDate,
    };

    try {
        const response = await fetch(`${URL}/menstrual/records`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {

        if (response.status == 401){
            alert("Invalid Session");
             window.location.reload();
             return;
        }
            alert("Failed to add record. Please try again.");
            return;
        }

        window.location.reload();
    } catch (error) {
        alert("Error adding record. Please try again.");
    }
}
