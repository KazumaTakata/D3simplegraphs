import * as d3 from "d3";
import "./css/index.css";

export default function() {
  let data = [30, 13, 281, 303, 635];

  let x = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

  d3
    .select("#container")
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("width", function(d) {
      return x(d) + "px";
    });
}
