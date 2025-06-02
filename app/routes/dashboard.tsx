import Calendar from "~/components/calendar-card";
import PredictCard from "~/components/predictdate-card";
import RecordCard from "~/components/record-card";

export default function Dashboard() {
  return (
    <div className="">
      <div className="fixed w-full pt-2 pb-2 pl-10 flex bg-gray-50 items-baseline space-x-4 shadow-md">
        <a
          href="/dashboard"
          className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
          aria-current="page"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Calendar
        </a>
      </div>
      <div className="pt-20 mx-5 lg:mx-50 grid grid-cols-1 lg:grid-cols-5 grid-flow-row gap-5">
        <div className="col-start-1 col-span-1 lg:col-span-2">
          <PredictCard />
          <Calendar />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <RecordCard />
        </div>
      </div>
    </div>
  );
}
