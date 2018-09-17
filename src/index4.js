import ScatterPlot from "./lib/scatterplot";

let linegraph = new ScatterPlot(".container", 400, 500, {
  left: 30,
  right: 30,
  top: 30,
  bottom: 30,
});

linegraph.addProperty({ fill: "red" });

linegraph.insertData([
  { xvalue: 10, yvalue: 15 },
  { xvalue: 1, yvalue: 5 },
  { xvalue: 13, yvalue: 5 },
  { xvalue: 6, yvalue: 4 },
  { xvalue: 6, yvalue: 34 },
]);
