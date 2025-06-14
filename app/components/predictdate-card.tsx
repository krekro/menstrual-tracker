import { getCookie, getForcast } from "~/services/cookies";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useEffect, useState } from "react";
import { updateDate } from "~/services/dom";

export default function PredictCard() {
  const [Active, setActive] = useState(false);
  const forcastDates = getForcast();

  return (
    <div onLoad={() => {}} className="relative mb-3">
      <Card>
        <CardHeader className="text-2xl text-gray-700 font-bold text-center">
          Next Date
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 text-center">
            <div
              id="nextDate"
              className="col-span-3 mb-5 text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-200 text-transparent bg-clip-text"
            >
              No Data
            </div>
            <div
              onClick={() => {
                setActive(!Active);
              }}
              id="dtlbutton"
              className="col-start-2 col-span-1 py-2 text-gray-500 text-xs rounded-2xl hover:bg-blue-400 hover:text-white hover:scale-101 hover: cursor-pointer"
            >
              More details
            </div>
          </div>
        </CardContent>
      </Card>
      {Active ? (
        <Card
          id="container"
          className="absolute top-0 w-full shadow-2xl bg-transparent hover:shadow-3xl z-998"
        >
          <CardHeader>
            <div className="grid grid-cols-4">
              <div className="flex gap-3 col-span-3 font-bold text-xl mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-info-icon lucide-info"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                More Info
              </div>
              <div className="flex justify-end items-center text-transparent hover:cursor-pointer hover:text-red-700">
                <div
                  onClick={() => {
                    setActive(!Active);
                  }}
                  className="text-sm scale-60 justify-center items-center rounded-4xl py-0.5 px-2 bg-red-400"
                >
                  x
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div id="stats" className="border-b-1 border-gray-200 mb-5">
              <div className="flex gap-3 font-bold text-lg text-gray-800 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-chart-bar-big-icon lucide-chart-bar-big"
                >
                  <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                  <rect x="7" y="13" width="9" height="4" rx="1" />
                  <rect x="7" y="5" width="12" height="4" rx="1" />
                </svg>
                Your Statistics
              </div>
              <div id="avg" className="col-span-3 mb-2 text-gray-600 text-sm">
                {`Cycle: ${getCookie("avg")} days`}
              </div>
              <div
                id="avgLen"
                className="col-span-3 mb-5 text-gray-600 text-sm"
              >
                {`Duration: ${getCookie("avgLen")} days`}
              </div>
            </div>
            <div id="forcast">
              <div className="flex gap-3 font-bold text-lg text-gray-800 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-calendar-days-icon lucide-calendar-days"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
                6 Months Forcast
              </div>
              <div className="bg-white border-1 rounded-2xl py-2 px-4 text-gray-600 text-sm">
                {forcastDates != undefined ? (
                  forcastDates.map((date, index) => (
                    <div
                      id={`forcast-dates-${index + 1}`}
                      className="flex justify-center border-b-1 border-b-gray-200 py-2"
                    >
                      {`${date}`}
                    </div>
                  ))
                ) : (
                  <div
                    id="forcast-dates-null"
                    className="flex justify-center py-2"
                  >
                    No Data
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
}
