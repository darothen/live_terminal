var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Function for parsing the date-time, which is stored
// in the obseration dataset as
//    2016-03-25 00:54:00
var formatDateTime = d3.time.format("%Y-%m-%d %H:%M:%S");

// Set up x-axis
var x = d3.time.scale()
    .range([0, width]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// Set up y-axis
var y = d3.scale.linear()
    .range([0, height]);
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// Set up line chart
var line = d3.svg.line()
    .x(function(d) {
        return x(d.date);
    })
    .y(function(d) {
        return y(d.temp);
    });

// Set up plotting area
var svg = d3.select("#graph").append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," +
                                      margin.top + ")");

// Load data and map it to plot
d3.csv('data/test_obs.csv', get_temps, function(error, data) {
    if (error) throw error;
    console.log(data[0]);

    x.domain(
        d3.extent(data, function(d) {
            return d.date;
        })
    );
    y.domain(
        d3.extent(data, function(d) {
            return d.temp;
        })
    );

    // Construct actual plot line elements
    // 1) x-axis
    svg.append("g")
        .attr("class", "x axis") // CSS selector
        .attr("transform", "translate(0," + height + ")") // move to bottom of plot
        .call(xAxis); // add the x-axis
    // 2) y-axis
    svg.append("g")
        .attr("class", "y axis") // CSS selector
        .call(yAxis);
    // 3) temperature plot
    svg.append("path")
        .datum(data) // Bind data to plot path elements
        .attr("class", "line") // CSS selector
        .attr("d", line);

});

function get_temps(d) {
    return {
        date: formatDateTime.parse(d.DateTime),
        temp: +d.tempi,
        dwpt: +d.dewpti
    };
}
