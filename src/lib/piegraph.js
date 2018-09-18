import * as d3 from "d3";
import "../css/index.css";

class PieGraph {
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
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    this.color = d3
      .scaleOrdinal()
      .range(["#DC3912", "#3366CC", "#109618", "#FF9900", "#990099"]);
    this.pie = d3
      .pie()
      .value(function(d) {
        return d.value;
      })
      .sort(null);
    this.text = d3
      .arc()
      .outerRadius(this.radius - 30)
      .innerRadius(this.radius - 30);
    this.property = {};
  }

  addProperty(property) {
    this.property = property;
  }

  insertData(rawdata) {
    let pieGroup = this.svg
      .selectAll(".pie")
      .data(this.pie(rawdata))
      .enter()
      .append("g")
      .attr("class", "pie");

    let arc = d3
      .arc()
      .outerRadius(this.radius)
      .innerRadius(0);

    let that = this;
    pieGroup
      .append("path")
      .attr("d", arc)
      .attr("fill", this.property["pie"]["fill"])
      .attr("opacity", 0.75)
      .attr("stroke", "white")
      .on("mouseover", function(d) {
        d3
          .select(this)
          .transition()
          .attr("fill", that.property["pie"]["hovercolor"]);
      })
      .on("mouseout", function(d) {
        d3
          .select(this)
          .transition()
          .attr("fill", that.property["pie"]["fill"]);
      });

    pieGroup
      .append("text")
      .attr("fill", this.property["pie"]["text"]["fill"])
      .attr("transform", d => {
        return "translate(" + this.text.centroid(d) + ")";
      })
      .attr("dy", "5px")
      .attr("font", "10px")
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.data.name;
      });

    let title = this.svg
      .append("text")
      .attr("y", -this.radius - 30)
      .attr("x", 0)
      .text(this.property["title"]["text"])
      .attr("text-anchor", "middle");
  }
}

export default PieGraph;
