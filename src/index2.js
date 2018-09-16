import LineGraph from "./lib/linegraph";

let linegraph = new LineGraph(".container", 400, 500, {
  left: 30,
  right: 30,
  top: 30,
  bottom: 30,
});

linegraph.addProperty({ fill: "red" });

linegraph.insertData([
  { time: "24-Apr-07", close: 313 },
  { time: "24-Apr-08", close: 133 },
  { time: "24-Apr-09", close: 43 },
  { time: "24-Apr-10", close: 63 },
]);
