import * as d3 from "d3";
import "../css/index.css";

class ScatterPlot {
  constructor(el, height, width, margin) {
    this.width = width - margin.left - margin.right;
    this.height = height - margin.top - margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2 - 10;
    let container = d3.select(el);
    this.svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.xScale = d3.scaleLinear().range([0, this.width]);

    this.yScale = d3.scaleLinear().range([this.height, 0]);

    this.property = {};
  }

  addProperty(property) {
    this.property = property;
  }

  insertData(data) {
    this.xScale.domain([
      d3.min(data.map(d => d.xvalue)) - 2,
      d3.max(data.map(d => d.xvalue)) + 2,
    ]);

    this.yScale.domain([
      d3.min(data.map(d => d.yvalue)) - 2,
      d3.max(data.map(d => d.yvalue)) + 2,
    ]);
    this.svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .append("text")
      .attr("class", "label")
      .attr("x", this.width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("x value");

    // y-axis
    this.svg
      .append("g")
      .attr("class", "y axis")
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("y value");

    this.svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", x => this.xScale(x.xvalue))
      .attr("cy", x => this.yScale(x.yvalue))
      .style("fill", function(d) {
        return "red";
      });
    //   .on("mouseover", function(d) {
    //     tooltip
    //       .transition()
    //       .duration(200)
    //       .style("opacity", 0.9);
    //     tooltip
    //       .html(
    //         d["Cereal Name"] + "<br/> (" + xValue(d) + ", " + yValue(d) + ")"
    //       )
    //       .style("left", d3.event.pageX + 5 + "px")
    //       .style("top", d3.event.pageY - 28 + "px");
    //   })
    //   .on("mouseout", function(d) {
    //     tooltip
    //       .transition()
    //       .duration(500)
    //       .style("opacity", 0);
    //   });

    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.xScale));

    // add the y Axis
    this.svg.append("g").call(d3.axisLeft(this.yScale));
  }
}

export default ScatterPlot;
