import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import DatePickerCalendar from "./ui/calendar";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { clearDate, getCookie, setEnd, setStart } from "~/services/cookies";
import { addRecord, fetchRecords } from "~/services/fetch";
import { reload } from "~/services/dom";

export default function Datepicker() {
  const [Active, setActive] = useState(false);
  const [isProcessing, setProcessing] = useState(false);

  function handleSubmit(uid: string, session_id: string) {
    setProcessing(true);
    const startDateStr = getCookie("startDate");
    const startDate = () => {
      if (startDateStr == "") {
        setProcessing(false);
        alert("Start date cannot be empty");
        return;
      } else {
        return new Date(startDateStr).toISOString();
      }
    };

    //end func call if no start date
    if (startDate() == undefined) {
      return;
    }

    const endDateStr = getCookie("endDate");
    const endDate = () => {
      if (endDateStr == "") {
        return null;
      } else {
        return new Date(endDateStr).toISOString();
      }
    };
    addRecord(uid, session_id, startDate(), endDate());
    clearDate();
  }

  function handleClick(id: string) {
    const Child = document.getElementById(id);
    if (Child) {
      Child.innerHTML = "dd/mm/yyyy";
    } else return;
    switch (id) {
      case "date1":
        setStart("");
        console.log(`Cleared StartDate`);
        break;
      case "date2":
        setEnd("");
        console.log(`Cleared EndDate`);
        break;
    }
  }

  return (
    <Card className="p-2 gap-2 grid grid-cols-7 mb-5 text-center text-sm text-gray-600 font-mono font-light shadow-2xs">
      <Button
        id="datepicker1"
        className="col-span-3 grid grid-cols-5 rounded-lg border-1 bg-transparent text-gray-600 hover:cursor-pointer hover:bg-transparent hover:scale-101 hover:hover:shadow-md transition-shadow"
      >
        <div
          onClick={() => {
            if (Active) {
              setActive(false);
            } else {
              setActive(true);
            }
          }}
          className="col-span-4 gap-2 flex items-center justify-center"
        >
          <div id="date1">dd/mm/yyyy</div>
          <CalendarIcon size="20px" />
        </div>
        <div
          onClick={() => {
            handleClick("date1");
          }}
          className="flex items-center justify-end text-gray-400 hover:text-red-800 hover:scale-102"
        >
          x
        </div>
      </Button>
      <Button className="col-span-3 grid grid-cols-5 rounded-lg border-1 bg-transparent text-gray-600 hover:cursor-pointer hover:bg-transparent hover:scale-101 hover:hover:shadow-md transition-shadow">
        <div
          onClick={() => {
            if (Active) {
              setActive(false);
            } else {
              setActive(true);
            }
          }}
          className="col-span-4 gap-2 flex items-center justify-center"
        >
          <div id="date2">dd/mm/yyyy</div>
          <CalendarIcon size="20px" />
        </div>
        <div
          onClick={() => {
            handleClick("date2");
          }}
          className="flex items-center justify-end text-gray-400 hover:text-red-800 hover:scale-102"
        >
          x
        </div>
      </Button>
      {isProcessing ? (
        <Button
          id="loading"
          className="col-span-1 hover:bg-pink-200 hover:cursor-pointer hover:scale-101"
        >
          <LoaderCircle className="size-6 animate-spin stroke-white" />{" "}
        </Button>
      ) : (
        <Button
          id="addbtn"
          onClick={() => {
            handleSubmit(getCookie("uid"), getCookie("session_id"));
          }}
          className="col-span-1 hover:bg-pink-200 hover:cursor-pointer hover:scale-101"
        >
          Add
        </Button>
      )}
      {Active && (
        <div className="col-span-6 transition-all transition-discrete">
          <DatePickerCalendar />
        </div>
      )}
    </Card>
  );
}
