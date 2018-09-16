import Piechart from "./lib/piegraph";

let linegraph = new Piechart(".container", 400, 500, {
  left: 30,
  right: 30,
  top: 30,
  bottom: 30,
});

linegraph.addProperty({ fill: "red" });

linegraph.insertData([
  { name: "A", value: 5 },
  { name: "B", value: 6 },
  { name: "C", value: 8 },
  { name: "D", value: 1 },
  { name: "E", value: 2 },
  { name: "F", value: 6 },
  { name: "G", value: 8 },
  { name: "H", value: 6 },
  { name: "I", value: 10 },
  { name: "J", value: 9 },
]);
