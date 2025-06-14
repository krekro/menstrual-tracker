import Calendar from "~/components/calendar-card";
import PredictCard from "~/components/predictdate-card";
import RecordCard from "~/components/record-card";

export default function Dashboard() {
  return (
    <div className="pt-20 mx-5 lg:mx-50 grid grid-cols-1 lg:grid-cols-5 grid-flow-row gap-5">
      <div className="col-start-1 col-span-1 lg:col-span-2">
        <PredictCard />
        <Calendar />
      </div>
      <div className="col-span-1 lg:col-span-3">
        <RecordCard />
      </div>
    </div>
  );
}
