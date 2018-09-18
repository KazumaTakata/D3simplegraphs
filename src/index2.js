import LineGraph from "./lib/linegraph";

let linegraph = new LineGraph(".container", 500, 500, {
  left: 60,
  right: 30,
  top: 30,
  bottom: 60,
});

linegraph.addProperty({
  line: {
    fill: "rgb(122, 24, 244)",
    hovercolor: "rgb(122, 24, 244)",
    circle: { fill: "rgb(122, 24, 244)" },
  },
  axis: { stroke: "rgb(122, 24, 244)", "font-weight": "100" },
  label: {
    fill: "rgb(122, 24, 244)",
    "font-weight": "100",
    xtext: "Time",
    ytext: "Average Age",
  },
  title: { text: "TITLE", fill: "rgb(122, 24, 244)" },
  tooltip: {
    body: "<p>tool tip</p>",
  },
});

linegraph.insertData([
  { xvalue: "24-Apr-07", yvalue: 313 },
  { xvalue: "24-Apr-08", yvalue: 133 },
  { xvalue: "24-Apr-09", yvalue: 43 },
  { xvalue: "24-Apr-10", yvalue: 63 },
]);
