import * as d3 from "d3";
import "../css/index.css";
import AxisGraph from "./base/axisgraph";

class BarGraph extends AxisGraph {
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

    this.x = d3
      .scaleBand()
      .rangeRound([0, this.width])
      .padding(0.1);
    this.y = d3.scaleLinear().rangeRound([this.height, 0]);
    this.property = {};

    this.tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    this.axisstyle = {};
  }

  insertData(data) {
    this.x.domain(
      data.map(function(d) {
        return d.xvalue;
      })
    );
    this.y.domain([
      0,
      d3.max(data, function(d) {
        return d.yvalue;
      }),
    ]);

    let bar = this.svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("rx", 1)
      .attr("ry", 1)
      .attr("x", d => {
        return this.x(d.xvalue);
      })
      .attr("width", this.x.bandwidth())
      .attr("y", d => {
        return this.y(d.yvalue);
      })
      .attr("height", d => {
        return this.height - this.y(d.yvalue);
      });

    this.applystyle(bar, this.property, "bar");

    let that = this;

    bar.on("mouseover", function(d) {
      d3.select(this).style("fill", that.property["bar"]["hovercolor"]);
      that.tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);
      that.tooltip
        .html(that.property["tooltip"]["body"])
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px");
    });

    bar.on("mouseout", function(d) {
      d3.select(this).style("fill", that.property["bar"]["fill"]);
      that.tooltip
        .transition()
        .duration(500)
        .style("opacity", 0);
    });

    bar.on("mousemove", function(d) {
      console.log(d);
      var xPosition = d3.mouse(this)[0] + 40;
      var yPosition = d3.mouse(this)[1] - 10;
      that.tooltip
        .style("left", xPosition + "px")
        .style("top", yPosition + "px");
    });

    // add the x Axis

    this.setaxis();
  }
}

export default BarGraph;
