import React from "react";
import ReactDom from "react-dom";
import Hello from "./Hello";

ReactDom.render(<Hello url="127.1.68.22:5000" method="getemotion"/>,document.getElementById("root"));
