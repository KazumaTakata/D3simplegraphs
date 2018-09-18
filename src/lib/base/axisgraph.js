import * as d3 from "d3";

class AxisGraph {
  constructor(el, height, width, margin) {}

  addProperty(property) {
    this.property = property;
  }

  applystyle(dom, style, kind) {
    let keys = Object.keys(style[kind]);
    keys.map(key => {
      dom.style(key, style[kind][key]);
    });
  }

  setaxis() {
    let xaxis = this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x));

    let yaxis = this.svg.append("g").call(d3.axisLeft(this.y));

    let title = this.svg
      .append("text")
      .attr("y", -10)
      .attr("x", this.width / 2)
      .text(this.property["title"]["text"]);

    let ylabel = this.svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -this.height / 2)
      .text(this.property["label"]["ytext"]);

    let xlabel = this.svg
      .append("text")
      .attr("y", this.height + 40)
      .attr("x", this.width / 2)
      .text(this.property["label"]["xtext"]);

    this.applystyle(xaxis.selectAll("line"), this.property, "axis");
    this.applystyle(yaxis.selectAll("line"), this.property, "axis");
    this.applystyle(xaxis.selectAll("path"), this.property, "axis");
    this.applystyle(yaxis.selectAll("path"), this.property, "axis");
    this.applystyle(xaxis.selectAll("text"), this.property, "axis");
    this.applystyle(yaxis.selectAll("text"), this.property, "axis");

    this.applystyle(xlabel, this.property, "label");
    this.applystyle(ylabel, this.property, "label");

    this.applystyle(title, this.property, "title");
  }
}

export default AxisGraph;
