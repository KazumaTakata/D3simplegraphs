import BarGraph from "./lib/bargraph";

let bargraph = new BarGraph(".container", 400, 500, {
  left: 30,
  right: 30,
  top: 30,
  bottom: 30,
});

bargraph.addProperty({ fill: "red" });

bargraph.insertData([
  { person: "josn", value: 33 },
  { person: "josn2", value: 21 },
  { person: "josn3", value: 2 },
  { person: "josn4", value: 2 },
]);
