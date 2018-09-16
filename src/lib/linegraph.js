import * as d3 from "d3";
import "../css/index.css";

class LineGraph {
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

    this.x = d3.scaleTime().rangeRound([0, this.width]);

    this.y = d3.scaleLinear().rangeRound([this.height, 0]);

    this.line = d3
      .line()
      .x(d => {
        return this.x(d.date);
      })
      .y(d => {
        return this.y(d.close);
      });
    this.property = {};

    this.parseTime = d3.timeParse("%d-%b-%y");

    this.div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  }

  addProperty(property) {
    this.property = property;
  }

  insertData(rawdata) {
    let data = rawdata.map(d => {
      return { date: this.parseTime(d.time), close: d.close };
    });
    this.x.domain(
      d3.extent(data, function(d) {
        return d.date;
      })
    );
    this.y.domain([
      0,
      10 +
        d3.max(data, function(d) {
          return d.close;
        }),
    ]);

    this.svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", this.line);

    let that = this;

    // add the x Axis
    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x));

    // add the y Axis
    this.svg.append("g").call(d3.axisLeft(this.y));
  }
}

export default LineGraph;
