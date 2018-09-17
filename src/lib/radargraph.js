import * as d3 from "d3";
import "../css/index.css";

class RadarChart {
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

    this.interpolateTypes = [
      d3.curveLinear,
      d3.curveStepBefore,
      d3.curveStepAfter,
      d3.curveBasis,
      d3.curveBasisOpen,
      d3.curveBasisClosed,
      d3.curveBundle,
      d3.curveCardinal,
      d3.curveCardinal,
      d3.curveCardinalOpen,
      d3.curveCardinalClosed,
      d3.curveNatural,
    ];

    this.cfg = {
      radius: 5,
      w: this.width,
      h: this.height,
      factor: 1,
      factorLegend: 0.85,
      levels: 3,
      maxValue: 0,
      radians: 2 * Math.PI,
      labelFactor: 1.25,
      opacityArea: 0.5,
      ToRight: 5,
      TranslateX: 80,
      TranslateY: 30,
      ExtraWidthX: 100,
      ExtraWidthY: 100,
      color: d3.scaleOrdinal().range(["#6F257F", "#CA0D59"]),
    };
    this.property = {};
  }

  addProperty(property) {
    this.property = property;
  }

  insertData(data) {
    let cfg = this.cfg;
    let allAxis = data[0].map((i, j) => {
      return i.axis;
    });
    let total = allAxis.length;
    let radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
    let Format = d3.format("%");
    let angleSlice = Math.PI * 2 / total;
    let maxValue = Math.max(
      cfg.maxValue,
      d3.max(data, function(i) {
        return d3.max(
          i.map(function(o) {
            return o.value;
          })
        );
      })
    );

    let rScale = d3
      .scaleLinear()
      .range([0, radius])
      .domain([0, maxValue]);

    var axisGrid = this.svg
      .append("g")
      .attr("class", "axisWrapper")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );

    axisGrid
      .selectAll(".levels")
      .data(d3.range(1, cfg.levels + 1).reverse())
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      .attr("r", function(d, i) {
        return radius / cfg.levels * d;
      })
      .style("fill", "transparent")
      .style("stroke", "red")
      .style("fill-opacity", 1);

    let axis = axisGrid
      .selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");
    //Append the lines
    axis
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", function(d, i) {
        return rScale(maxValue * 1.1) * Math.cos(angleSlice * i);
      })
      .attr("y2", function(d, i) {
        return rScale(maxValue * 1.1) * Math.sin(angleSlice * i);
      })
      .attr("class", "line")
      .style("stroke", "red")
      .style("stroke-width", "1px");

    axis
      .append("text")
      .attr("class", "legend")
      .style("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("x", function(d, i) {
        return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i);
      })
      .attr("y", function(d, i) {
        return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i);
      })
      .text(function(d) {
        return d;
      });
    //   .call(wrap, cfg.wrapWidth);
    let radarLine = d3
      .radialLine()
      .curve(this.interpolateTypes[3])
      .radius(function(d) {
        return rScale(d.value);
      })
      .angle(function(d, i) {
        return i * angleSlice;
      });
    let blobWrapper = this.svg
      .selectAll(".radarWrapper")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "radarWrapper")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
    blobWrapper
      .append("path")
      .attr("class", "radarArea")
      .attr("d", function(d, i) {
        return radarLine(d);
      })
      .style("fill", function(d, i) {
        return cfg.color(i);
      })
      .style("fill-opacity", cfg.opacityArea);
  }
}

export default RadarChart;
