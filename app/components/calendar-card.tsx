import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";

function generateDate(Month: number) {
  //console.log("started generateDate");
  let CurrDate = new Date();
  const initDate = new Date(CurrDate.getFullYear(), Month, 1);
  //console.log(`InitDate : ${initDate}`);
  let dateArr: Date[] = [];
  let i = 0;
  do {
    CurrDate = new Date(
      initDate.getFullYear(),
      initDate.getMonth(),
      initDate.getDate() + i
    );
    //console.log(`New CurrDate : ${CurrDate}`);
    if (CurrDate.getMonth() == initDate.getMonth()) {
      dateArr.push(
        new Date(CurrDate.getTime() - CurrDate.getTimezoneOffset() * 60000)
      );
    }
    i++;
  } while (CurrDate.getMonth() == initDate.getMonth());
  //console.log(dateArr.length);
  //console.log(`Returned datearr : ${dateArr}`);
  return dateArr;
}

function RenderCalendar() {
  const CurrDate = new Date();
  const [Month, setMonth] = useState(CurrDate.getMonth());
  const [dateArr, setDateArr] = useState<Date[]>(generateDate(Month));

  useEffect(() => {
    setDateArr(generateDate(Month));
  }, [Month]);

  return (
    <div className="h-[220px]">
      <div className="grid grid-cols-3 text-center select-none">
        <div
          onClick={() => {
            setMonth(Month - 1);
          }}
          className="flex justify-start col-span-1 hover:cursor-pointer hover:scale-101"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left-icon lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </div>
        <div className="col-span-1 font-bold">
          {dateArr[0].getFullYear()} {dateArr[0].toDateString().split(" ")[1]}
        </div>
        <div
          onClick={() => {
            setMonth(Month + 1);
          }}
          className="flex col-span-1 justify-end hover:cursor-pointer hover:scale-101"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right-icon lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 text-center">
        <div id="Sun" className="rounded-l-4xl col-start-1 bg-gray-200">
          Sun
        </div>
        <div id="Mon" className="col-start-2 bg-gray-200">
          Mon
        </div>
        <div id="Tue" className="col-start-3 bg-gray-200">
          Tue
        </div>
        <div id="Wed" className="col-start-4 bg-gray-200">
          Wed
        </div>
        <div id="Thu" className="col-start-5 bg-gray-200">
          Thu
        </div>
        <div id="Fri" className="col-start-6 bg-gray-200">
          Fri
        </div>
        <div id="Sat" className="rounded-r-4xl col-start-7 bg-gray-200">
          Sat
        </div>
        <div className="mt-3 col-span-7"></div>
        {dateArr.map((day, index) => (
          <div
            key={index}
            className={`font-light text-sm mb-1 hover:bg-blue-100 hover:scale-110 hover:rounded-3xl hover:cursor-pointer text-center col-span-1 col-start-${
              dateArr[index].getDay() + 1
            } ${
              dateArr[index].toISOString().split("T")[0] ==
              new Date().toISOString().split("T")[0]
                ? "bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl"
                : ""
            }`}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Calendar() {
  return (
    <div>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent>
          <RenderCalendar />
        </CardContent>
      </Card>
    </div>
  );
}
