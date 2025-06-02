import { getCookie } from "~/services/cookies";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useEffect, useState } from "react";
import { updateDate } from "~/services/dom";

export default function PredictCard() {
  return (
    <div onLoad={() => {}} className="mb-3">
      <Card>
        <CardHeader className="text-2xl text-gray-700 font-bold text-center">
          Your Next Date
        </CardHeader>
        <CardContent>
          <div className="grid-cols-3 gap-3 text-center">
            <div
              id="nextDate"
              className="col-span-3 mb-3 text-xl font-bold bg-gradient-to-r from-purple-700 to-pink-200 text-transparent bg-clip-text"
            >
              No Data
            </div>
            <div id="avg" className="col-span-3 text-gray-500 text-sm">
              Avg: No Data
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
