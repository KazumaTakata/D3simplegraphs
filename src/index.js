import BarGraph from "./lib/bargraph";

let bargraph = new BarGraph(".container", 500, 500, {
  left: 60,
  right: 30,
  top: 30,
  bottom: 60,
});

bargraph.addProperty({
  bar: { fill: "rgba(12, 34, 244, .4)", hovercolor: "rgb(122, 24, 244)" },
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

bargraph.insertData([
  { xvalue: "josn", yvalue: 33 },
  { xvalue: "josn2", yvalue: 21 },
  { xvalue: "josn3", yvalue: 2 },
  { xvalue: "josn4", yvalue: 2 },
  { xvalue: "josn5", yvalue: 100 },
  { xvalue: "josn33", yvalue: 10 },
]);
