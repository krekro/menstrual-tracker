import type { record } from "~/types/data";
import { Card, CardContent, CardHeader } from "./ui/card";

import { useEffect, useState, use } from "react";
import { Trash2, SquarePen, LoaderCircle, CalendarIcon } from "lucide-react";
import Datepicker from "./datepicker-card";
import { getKey } from "~/services/api";
import type { UUIDTypes } from "uuid";
import { deleteRecord, fetchRecords } from "~/services/fetch";
import { getCookie, setCollapse } from "~/services/cookies";

//generate dummy records
async function fetchTestData(): Promise<record[]> {
  let testData: record[] = [];
  let i: number;
  for (i = 1; i < 10; i++) {
    let startdate = new Date(2025, i, i);
    let enddate = new Date(2025, i, i);

    testData.push({
      startDate: startdate,
      endDate: enddate,
      id: "",
      createDate: new Date(),
      note: "Test",
      uid: "",
    });
  }
  testData.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

  return testData;
}

function expand() {
  const ele = document.getElementById("content");
  if (ele) {
    if (ele.style.display == "block") {
      ele.style.display = "none";
      setCollapse("none");
    } else {
      ele.style.display = "block";
      setCollapse("block");
    }
  }
}

export default function RecordCard() {
  const [data, setData] = useState<record[]>([]);
  const [Target, setTarget] = useState(-1);
  const [isProcessing, setProcessing] = useState(false);
  const display = getCookie("collapse");

  function loadExpand() {
    const ele = document.getElementById("content");
    if (ele) {
      ele.style.display = display;
      console.log(`display: ${display}`);
    }
  }

  //Delete record
  function handleDelete(id: UUIDTypes) {
    deleteRecord(getCookie("uid"), getCookie("session_id"), id.toString());
  }

  useEffect(() => {
    loadExpand();
    fetchRecords(getCookie("uid"), getCookie("session_id")).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="col-start-3 col-span-3">
      <Card className="flex hover:shadow-xl transition-shadow ">
        <CardHeader
          id="collapsibile"
          onClick={() => {
            expand();
          }}
          className="flex justify-center text-2xl text-gray-700 font-bold text-center"
        >
          <div>Your Records</div>
          <div className="absolute right-60">+</div>
        </CardHeader>
        <CardContent id="content">
          <Datepicker />
          <div className="px-4 grid grid-cols-7 gap-1 text-sm font-mono font-light text-gray-400">
            <div className="col-span-3">Start Date</div>
            <div className="col-span-3">End Date</div>
          </div>
          <div className="h-[500px] overflow-x-hidden overflow-y-scroll">
            {data.length == 0 ? (
              <Card className="p-2 h-1/2 gap-1 flex justify-center items-center mb-3 text-center text-sm text-gray-600 font-mono font-extralight shadow-2xs">
                No Record
              </Card>
            ) : (
              data.map((record, index) => (
                <Card
                  key={index}
                  className="p-2 gap-1 grid grid-cols-7 mb-3 font-bold text-center text-sm shadow-2xs"
                >
                  <Card
                    className={`col-span-3 flex justify-center items-center h-7 text-gray-600 hover:scale-101 hover:hover:shadow-md transition-shadow rounded-4xl ${
                      index % 2 === 0
                        ? "bg-gradient-to-r from-purple-100 to-blue-100"
                        : "bg-gradient-to-r from-blue-100 to-purple-100"
                    }`}
                  >
                    {record.startDate.toLocaleDateString("en-GB")}
                  </Card>
                  <Card
                    className={`col-span-3 flex justify-center items-center h-7 text-gray-600 hover:scale-101 hover:hover:shadow-md transition-shadow rounded-4xl ${
                      index % 2 === 0
                        ? "bg-gradient-to-r from-purple-100 to-pink-100"
                        : "bg-gradient-to-r from-pink-100 to-purple-100"
                    }`}
                  >
                    {record.endDate.toLocaleDateString("en-GB")}
                  </Card>
                  <div className="col-span-1 flex-col place-self-center">
                    {isProcessing && Target == index ? (
                      <LoaderCircle className="size-4 animate-spin stroke-red-700" />
                    ) : (
                      <Trash2
                        onClick={() => {
                          setProcessing(true);
                          setTarget(index);
                          handleDelete(record.id);
                        }}
                        className="hover:stroke-red-800 hover: cursor-pointer"
                        width={15}
                      />
                    )}
                    <SquarePen
                      className="hover:stroke-blue-600 hover: cursor-pointer"
                      width={15}
                    />
                  </div>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
