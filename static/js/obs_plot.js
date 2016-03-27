var margin = {top: 20, right: 20, bottom: 50, left: 50},
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
    .range([height, 0]);
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// Set up plotting area
var svg = d3.select("#graph").append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," +
                                      margin.top + ")");

 var lineGen = function(data, key) {
    var line = d3.svg.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d[key]); });
    return line(data);
};

// Load data and map it to plot
d3.csv('data/test_obs.csv', get_temps, function(error, data) {
    if (error) throw error;
    console.log(data[0]);

    x.domain(
        d3.extent(data, function(d) {
            return d.date;
        })
    );
    var y_pad = 2.5;
    y.domain([
        d3.min(data, function(d) { return Math.min(d.temp, d.dwpt) - y_pad; }),
        d3.max(data, function(d) { return Math.max(d.temp, d.dwpt) + y_pad; }),
    ]);

    // Construct actual plot line elements
    // 1) x-axis
    svg.append("g")
        .attr("class", "x axis") // CSS selector
        .attr("transform", "translate(0," + height + ")") // move to bottom of plot
        .call(xAxis); // add the x-axis
    svg.append("text")
        .attr("class", "axislabel")
        .attr("x", width/2)
        .attr("y", height + margin.bottom)
        .text("Time");

    // 2) y-axis
    svg.append("g")
        .attr("class", "y axis") // CSS selector
        .call(yAxis);
    svg.append("text")
        .attr("class", "axislabel")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .text("Temperature / Dewpoint (F)");

    // 3) temperature plot
    svg.append("path")
        // .data(data) // Bind data to plot path elements
        .attr("class", "temp line") // CSS selector
        .style("fill", "none")
        .attr("d", lineGen(data, 'temp'));
    // 4) Temperature glyphs
    svg.append("g")
        .attr("class", "temp dots") // CSS selector
      .selectAll("path")
        .data(data)
      .enter().append("path")
        .attr("transform", function(d) {
            return "translate(" + x(d.date) + "," + y(d.temp) + ")";
        })
        .attr("d",
            d3.svg.symbol()
                .size(50)
                .type("cross")
        );
    // 5) Dewpoint plot
    svg.append("path")
        // .datum(data) // Bind data to plot path elements
        .attr("class", "dwpt line") // CSS selector
        .style("fill", "none")
        .attr("d", lineGen(data, 'dwpt'));
    // 6) Dewpoint glyphs
    svg.append("g")
        .attr("class", "dwpt dots") // CSS selector
      .selectAll("path")
        .data(data)
      .enter().append("path")
        .attr("transform", function(d) {
            return "translate(" + x(d.date) + "," + y(d.dwpt) + ")";
        })
        .attr("d",
            d3.svg.symbol()
                .size(50)
                .type("cross")
        );

});

function get_temps(d) {
    return {
        date: formatDateTime.parse(d.DateTime),
        temp: +d.tempi,
        dwpt: +d.dewpti
    };
}
