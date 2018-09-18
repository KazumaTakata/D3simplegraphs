import * as d3 from "d3";
import "../css/index.css";
import AxisGraph from "./base/axisgraph";

class LineGraph extends AxisGraph {
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

    this.x = d3.scaleTime().rangeRound([0, this.width]);

    this.y = d3.scaleLinear().rangeRound([this.height, 0]);

    this.line = d3
      .line()
      .x(d => {
        return this.x(d.xvalue);
      })
      .y(d => {
        return this.y(d.yvalue);
      });
    this.property = {};

    this.parseTime = d3.timeParse("%d-%b-%y");

    this.tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  }

  addProperty(property) {
    this.property = property;
  }

  applystyle(dom, style, kind) {
    let keys = Object.keys(style[kind]);
    keys.map(key => {
      dom.style(key, style[kind][key]);
    });
  }

  insertData(rawdata) {
    let data = rawdata.map(d => {
      return { xvalue: this.parseTime(d.xvalue), yvalue: d.yvalue };
    });
    this.x.domain(
      d3.extent(data, function(d) {
        return d.xvalue;
      })
    );
    this.y.domain([
      0,
      10 +
        d3.max(data, function(d) {
          return d.yvalue;
        }),
    ]);

    let that = this;

    this.svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", this.property["line"]["fill"])
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", this.line);

    this.svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", d => this.x(d.xvalue))
      .attr("cy", d => this.y(d.yvalue))
      .attr("fill", this.property["line"]["circle"]["fill"])
      .on("mouseover", function(d) {
        d3
          .select(this)
          .transition()
          .attr("r", 10);
        that.tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        that.tooltip
          .html(that.property["tooltip"]["body"])
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
      })
      .on("mouseout", function(d) {
        d3
          .select(this)
          .transition()
          .attr("r", 5);
        that.tooltip
          .transition()
          .duration(500)
          .style("opacity", 0);
      })
      .on("mousemove", function(d) {
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

export default LineGraph;
