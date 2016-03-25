console.log("here");

var data;

console.log("here");

d3.json("/hourly", function(error, json) {
    if (error) return console.warn(error);
    data = json;
});
