import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

function Kanban() {
  const [add, setAdd] = useState(false);
  const [taskname, setTaskname] = useState("");

  document.body.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      setAdd(false);
    }
  });

  function handleAddtask(id: string) {
    setAdd(true);
  }

  function saveTask() {}

  return (
    <div className="h-screen overflow-x-auto flex flex-row gap-5">
      {add ? (
        <Card className="h-fit min-h-[58px] w-1/4 px-5 py-1">
          <div id="addtask" className="inline-flex">
            <div className="mt-1 inline-flex">
              <Input
                type="text"
                placeholder="task name"
                onChange={(e) => setTaskname(e.target.value)}
              />
              <Button
                onClick={() => {}}
                className="rounded-md bg-white text-gray-900 hover:bg-gray-900 hover:text-white hover:cursor-pointer"
              >
                +
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="h-fit min-h-[58px] w-1/4 px-5 py-1">
          <div id="addtask" className="inline-flex">
            <Button
              onClick={() => {
                handleAddtask("addtask");
              }}
              className="mt-1 rounded-4xl bg-white text-gray-900 hover:bg-gray-900 hover:text-white hover:cursor-pointer"
            >
              +
            </Button>
            <p className="p-3">Add task</p>
          </div>
        </Card>
      )}

      <Card className="h-fit w-1/4 px-5 py-1">
        <div id="addtask2" className="inline-flex">
          <Button
            onClick={() => {
              handleAddtask("addtask2");
            }}
            className="mt-1 rounded-4xl bg-white text-gray-900 hover:bg-gray-900 hover:text-white hover:cursor-pointer"
          >
            +
          </Button>
          <p className="p-3">Add task</p>
        </div>
      </Card>
    </div>
  );
}

export default Kanban;
