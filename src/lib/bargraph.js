import * as d3 from "d3";
import "../css/index.css";

class BarGraph {
  constructor(el, height, width, margin) {
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

    this.div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  }

  addProperty(property) {
    this.property = property;
  }

  insertData(data) {
    this.x.domain(
      data.map(function(d) {
        return d.person;
      })
    );
    this.y.domain([
      0,
      d3.max(data, function(d) {
        return d.value;
      }),
    ]);

    let bar = this.svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => {
        return this.x(d.person);
      })
      .attr("width", this.x.bandwidth())
      .attr("y", d => {
        return this.y(d.value);
      })
      .attr("height", d => {
        return this.height - this.y(d.value);
      });
    Object.keys(this.property).map(style => {
      bar.style(style, this.property[style]);
    });

    let that = this;

    bar.on("mouseover", function(d) {
      d3.select(this).style("fill", "black");
      that.div
        .transition()
        .duration(200)
        .style("opacity", 0.9);
      that.div
        .html("tooltip")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    });

    bar.on("mouseout", function(d) {
      d3.select(this).style("fill", "red");
      that.div
        .transition()
        .duration(500)
        .style("opacity", 0);
    });

    bar.on("mousemove", function(d) {
      console.log(d);
      var xPosition = d3.mouse(this)[0] - 5;
      var yPosition = d3.mouse(this)[1] - 5;
      that.div.style("left", xPosition + "px").style("top", yPosition + "px");
    });

    // add the x Axis
    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x));

    // add the y Axis
    this.svg.append("g").call(d3.axisLeft(this.y));
  }
}

export default BarGraph;
