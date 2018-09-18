import Piechart from "./lib/piegraph";

let linegraph = new Piechart(".container", 500, 500, {
  left: 30,
  right: 30,
  top: 60,
  bottom: 30,
});

linegraph.addProperty({
  pie: {
    text: { fill: "white" },
    fill: "rgb(122, 24, 244)",
    hovercolor: "rgb(122, 224, 244)",
  },

  title: { text: "TITLE", fill: "rgb(122, 24, 244)" },
  tooltip: {
    body: "<p>tool tip</p>",
  },
});

linegraph.insertData([
  { name: "A", value: 50 },
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
