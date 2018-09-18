import ScatterPlot from "./lib/scatterplot";

let linegraph = new ScatterPlot(".container", 400, 500, {
  left: 60,
  right: 30,
  top: 30,
  bottom: 60,
});

linegraph.addProperty({
  axis: { stroke: "rgb(122, 24, 244)", "font-weight": "100" },
  label: {
    fill: "rgb(122, 24, 244)",
    "font-weight": "100",
    xtext: "country",
    ytext: "Average Age",
  },
  title: { text: "TITLE", fill: "rgb(122, 24, 244)" },
  tooltip: {
    body: "<p>tool tip</p>",
  },
});

linegraph.insertData([
  { xvalue: 10, yvalue: 15 },
  { xvalue: 1, yvalue: 5 },
  { xvalue: 13, yvalue: 5 },
  { xvalue: 6, yvalue: 4 },
  { xvalue: 6, yvalue: 34 },
]);
