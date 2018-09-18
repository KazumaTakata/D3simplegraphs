import * as d3 from "d3";
import "../css/index.css";
import AxisGraph from "./base/axisgraph";

class ScatterPlot extends AxisGraph {
  constructor(el, height, width, margin) {
    super();
    this.width = width - margin.left - margin.right;
    this.height = height - margin.top - margin.bottom;
    let container = d3.select(el);
    this.svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.x = d3.scaleLinear().range([0, this.width]);

    this.y = d3.scaleLinear().range([this.height, 0]);

    this.property = {};

    this.tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  }

  addProperty(property) {
    this.property = property;
  }

  insertData(data) {
    this.x.domain([
      d3.min(data.map(d => d.xvalue)) - 2,
      d3.max(data.map(d => d.xvalue)) + 2,
    ]);

    this.y.domain([
      d3.min(data.map(d => d.yvalue)) - 2,
      d3.max(data.map(d => d.yvalue)) + 2,
    ]);

    let that = this;

    this.svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", 10)
      .attr("cx", x => this.x(x.xvalue))
      .attr("cy", x => this.y(x.yvalue))
      .style("fill", function(d) {
        return "red";
      })
      .on("mouseover", function(d) {
        d3
          .select(this)
          .transition()
          .style("fill", "yellow")
          .attr("r", 15);

        that.tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        that.tooltip
          .html("tooltip")
          .style("left", d3.event.pageX + 5 + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function(d) {
        d3
          .select(this)
          .transition()
          .style("fill", "red")
          .attr("r", 10);
        that.tooltip
          .transition()
          .duration(500)
          .style("opacity", 0);
      });
    this.setaxis();
  }
}

export default ScatterPlot;
