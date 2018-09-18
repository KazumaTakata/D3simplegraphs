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
      dotRadius: 4,
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
    let radius = cfg.factor * Math.min(this.width / 2, this.height / 2);
    let angleSlice = Math.PI * 2 / total;
    let Format = d3.format("%");
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
      // .curve(this.interpolateTypes[4])
      .radius(function(d) {
        return rScale(d.value);
      })
      .angle(function(d, i) {
        return i * angleSlice + Math.PI / 2;
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
      .style("fill-opacity", cfg.opacityArea)
      .on("mouseover", function(d, i) {
        d3
          .selectAll(".radarArea")
          .transition()
          .duration(200)
          .style("fill-opacity", 0.1);
        d3
          .select(this)
          .transition()
          .duration(200)
          .style("fill-opacity", 0.7);
      })
      .on("mouseout", function() {
        d3
          .selectAll(".radarArea")
          .transition()
          .duration(200)
          .style("fill-opacity", cfg.opacityArea);
      });

    blobWrapper
      .selectAll(".radarCircle")
      .data(d => d)
      .enter()
      .append("circle")
      .attr("class", "radarCircle")
      .attr("r", cfg.dotRadius)
      .attr("cx", function(d, i) {
        return rScale(d.value) * Math.cos(angleSlice * i);
      })
      .attr("cy", function(d, i) {
        return rScale(d.value) * Math.sin(angleSlice * i);
      })
      .style("fill", function(d, i, j) {
        return cfg.color(j);
      })
      .style("fill-opacity", 0.8);

    axisGrid
      .selectAll(".axisLabel")
      .data(d3.range(1, cfg.levels + 1).reverse())
      .enter()
      .append("text")
      .attr("class", "axisLabel")
      .attr("x", 4)
      .attr("y", function(d) {
        return -d * radius / cfg.levels;
      })
      .attr("dy", "0.4em")
      .style("font-size", "10px")
      .attr("fill", "black")
      .text(function(d, i) {
        return Math.round(maxValue * d / cfg.levels * 100) + "%";
      });
  }
}

export default RadarChart;
