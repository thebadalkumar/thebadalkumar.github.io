const margin = {
    top: 10,
    right: 20,
    bottom: 30,
    left: 30
};

const w = 650 - margin.left - margin.right;
const h = 650 - margin.top - margin.bottom;

var proj = d3.geo.mercator();
var path = d3.geo.path().projection(proj);
var t = proj.translate();
var s = proj.scale();

var india = d3.select("#chart").append("svg:svg")
    .attr("id", "india")
    .attr('viewBox', "0 0 650 650")
    .call(initialize);

var defs = india.append('svg:defs');

defs.append("svg:pattern")
    .attr("id", "chakra")
    .attr("width", 1)
    .attr("height", 1)
    .append("svg:image")
    .attr("xlink:href", 'chakra.png')
    .attr("width", 125)
    .attr("height", 50)
    .attr("x", 25)
    .attr("y", 52);

d3.json('states.geojson', function(json) {

    india.selectAll("path")
        .data(json.features)
        .enter().append("path")
        .attr("d", path)
        .style("fill", "#ffbf00")
        // .style("fill", (d)=>d.properties.fill)

    .on('click', function(d, i) {
            let ourstate = d.properties.state;
            var getState = prompt(`Enter ${d.properties.type == 'ut' ? "UT Name" : "State Name"}`);
            if (getState.toLowerCase().trim() == ourstate.toLowerCase()) {
                ourstate == "Madhya Pradesh" ? this.style.fill = "url(#chakra)" : this.style.fill = d.properties.fill
                india.append("text")
                    .attr("transform", "translate(" + path.centroid(d) + ")")
                    .attr("dx", ourstate == "Madhya Pradesh" ? "-1.5em" : "-1em")
                    .attr("dy", ourstate == "Madhya Pradesh" ? "-1.6em" : "0.35em")
                    .style("font-size", ".7rem")
                    .style("cursor", "default")
                    .text(ourstate)
                    .on("mouseover", function() {
                        tooltip.html(`${d.properties.type == 'ut'? 'Union Territory': 'State'}: ${ourstate}<br>Capital: ${d.properties.capital}<br>GST Code: ${d.properties.state_code}`);

                        return tooltip.attr("class") == "showMe" ? tooltip.style("visibility", "visible") : tooltip.style("visibility", "hidden");
                    })
                    .on("mousemove", function() {
                        return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                    })
                    .on("mouseout", function() {
                        return tooltip.style("visibility", "hidden");
                    })
            } else
                this.style.fill = "red";
        })
        .on("mouseover", function(d) {
            tooltip.html(`${d.properties.type == 'ut'? 'Union Territory': 'State'}: ${d.properties.state}<br>Capital: ${d.properties.capital}<br>GST Code: ${d.properties.state_code}`);

            return tooltip.attr("class") == "showMe" ? tooltip.style("visibility", "visible") : tooltip.style("visibility", "hidden");
        })
        .on("mousemove", function() {
            return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
        })
        .on("mouseout", function() {
            return tooltip.style("visibility", "hidden");
        })
        .on('mouseleave', function(d, i) {
            d3.select(this).transition().duration(100)
                .style("opacity", 1);
        })
        .on('mouseenter', function(d, i) {
            d3.select(this).transition().duration(100)
                .style("opacity", 0.5);

        });
});

var tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")

d3.select("#showData").on("click", function() {
    if (this.value == "Show Details") {
        this.value = "Hide Details";
        d3.select("#tooltip").attr("class", "showMe");
    } else {
        this.value = "Show Details";
        d3.select("#tooltip").attr("class", "hideMe");
    }
});

india.append("text")
    .attr("dx", "20em")
    .attr("dy", "3em")
    .attr("id", "infotxt")
    .style("fill", "#000")
    .text("Click on Indian Map to Guess State / UT Name.");

india.append("text")
    .attr("dx", "33.4em")
    .attr("dy", "6em")
    .attr("id", "disctxt")
    .style("fill", "#000")
    .style("font-size", ".6rem")
    .text("*If your guess is incorrect, the background turns red");

india.append("text")
    .attr("dx", "29em")
    .attr("dy", "5em")
    .attr("id", "dldBtn")
    .style("fill", "blue")
    .style("cursor", "pointer")
    .html("<a>Export Image</a>");

india.append("text")
    .attr("id", "showData")
    .attr("dx", "22em")
    .attr("dy", "5em")
    .style("fill", "blue")
    .style("cursor", "pointer")
    .text("Show Details")
    .on("click", function() {
        if (this.innerHTML == "Show Details") {
            alert("Mouse Hover on the Map")
            this.innerHTML = "Hide Details";
            d3.select("#tooltip").attr("class", "showMe");
        } else {
            this.innerHTML = "Show Details";
            d3.select("#tooltip").attr("class", "hideMe");
        }
    })

function initialize() {
    proj.scale(6400);
    proj.translate([-1150, 720]);
}