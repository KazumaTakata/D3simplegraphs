import "./css/index.css";
import Radargraph from "./lib/radargraph";
let radargraph = new Radargraph(".container", 400, 500, {
  left: 30,
  right: 30,
  top: 60,
  bottom: 60,
});

radargraph.addProperty({ fill: "red" });

radargraph.insertData([
  [
    //iPhone
    { axis: "Battery Life", value: 0.22 },
    { axis: "Brand", value: 0.28 },
    { axis: "Contract Cost", value: 0.29 },
    { axis: "Design And Quality", value: 0.17 },
    { axis: "Have Internet Connectivity", value: 0.22 },
    { axis: "Large Screen", value: 0.02 },
    { axis: "Price Of Device", value: 0.21 },
    { axis: "To Be A Smartphone", value: 0.5 },
  ],
  [
    //Samsung
    { axis: "Battery Life", value: 0.27 },
    { axis: "Brand", value: 0.16 },
    { axis: "Contract Cost", value: 0.35 },
    { axis: "Design And Quality", value: 0.13 },
    { axis: "Have Internet Connectivity", value: 0.2 },
    { axis: "Large Screen", value: 0.13 },
    { axis: "Price Of Device", value: 0.35 },
    { axis: "To Be A Smartphone", value: 0.38 },
  ],
  [
    //Nokia Smartphone
    { axis: "Battery Life", value: 0.26 },
    { axis: "Brand", value: 0.1 },
    { axis: "Contract Cost", value: 0.3 },
    { axis: "Design And Quality", value: 0.14 },
    { axis: "Have Internet Connectivity", value: 0.22 },
    { axis: "Large Screen", value: 0.04 },
    { axis: "Price Of Device", value: 0.41 },
    { axis: "To Be A Smartphone", value: 0.3 },
  ],
]);
