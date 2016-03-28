var jsdom = require('jsdom');

jsdom.env(
  "<html><body><div id=\"chart\"></div></body></html>", // CREATE DOM HOOK

  [
     'http://d3js.org/d3.v3.min.js', // JS DEPENDENCIES online ...
     'static/js/d3.v3.min.js'        // ... & local-offline
  ],


function (err, window) {

// D3JS CODE * * * * * * * * * * * * * * * * * * * * * * * *
var svg = window.d3.select("#chart") // Hook into the div we created
    .append("svg")
    .attr("width", 100)
    .attr("height", 100);

console.log(window.d3);

svg.append("rect")
    .attr("id", "rect1")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 80)
    .attr("height", 80)
    .style("fill", "red");
// END (D3JS) * * * * * * * * * * * * * * * * * * * * * * * *

//PRINTING OUT SELECTION - contained in div
console.log( window.d3.select("#chart").html() );
} // end function

);
