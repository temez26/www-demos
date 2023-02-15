var tip = d3.select(".chart-container")
	.append("div")
  .attr("class", "tip")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden");

var svg = d3.select("svg").attr("class", "background-style"),
    margin = {top: 20, right: 20, bottom: 42, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.05),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  d3.json('Measures1.json')
  .then(data => {
    const measures = ["AirPressure", "Humidity", "Temp"]; 

    // järjestelee tulostuksen järestyksen
    measures.sort((a, b) => {
      if (a === "AirPressure") return -1;
      else if (b === "AirPressure") return 1;
      else if (a === "Temp") return -1;
      else if (b === "Temp") return 1;
      else return 0;
    });

    measures.forEach(measure => {
      
    const values = Object.keys(data).reduce((acc, key) => {
        acc.push(data[key].Measures[measure]);
        return acc;
      }, []);

      const numbers = values.map(value => parseFloat(value.replace(",",".")));

      const minValue = d3.min(numbers);
      const maxValue = d3.max(numbers);

      let minString = `${minValue}`;
      let maxString = `${maxValue}`;

      if (measure === "AirPressure") {
        minString += " mmHg";
        maxString += " mmHg";
      } else if (measure === "Temp") {
        minString += "°C";
        maxString += "°C";
      } else if (measure === "Humidity") {
        minString += "%";
        maxString += "%";
      }
      console.log(minString); 
      console.log(maxString); 
      
    });

  d3.json('Measures.json')
  .then(data => {
    const measures = ["AirPressure"]; 

    // järjestelee tulostuksen järestyksen
    measures.sort((a, b) => {
      if (a === "AirPressure") return -1;
      else if (b === "AirPressure") return 1;
      else if (a === "Temp") return -1;
      else if (b === "Temp") return 1;
      else return 0;
    });

    measures.forEach(measure => {
      
    const values = Object.keys(data).reduce((acc, key) => {
        acc.push(data[key].Measures[measure]);
        return acc;
      }, []);

      const numbers = values.map(value => parseFloat(value.replace(",",".")));

      const minValue = d3.min(numbers);
      const maxValue = d3.max(numbers);

   
    



data = [{
  Airpressure: "Max",
  count: maxValue
},{
  Airpressure: "Min",
  count: minValue
}];


  
x.domain(data.map(function(d) { return d.Airpressure; }));
y.domain([0, d3.max(data, function(d) { return d.count; })]);

g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .append("text")
  
  .attr("y", 6)
  .attr("dy", "0.7em")
  .attr("text-anchor", "end")
  .text(" mmHg");
  g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
.append("text")
  .attr("y", 6)
  .attr("dy", "2.5em")
  .attr("dx", width/2 - margin.left)
  .attr("text-anchor", "start")
  .text("Airpressure");   


g.append("g")
  .attr("class", "axis axis--y")
  .call(d3.axisLeft(y).ticks(30))
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")
    


g.selectAll(".bar")
  .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.Airpressure); })
    .attr("y", function(d) { return y(d.count); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.count)})
    .on("mouseover", function(d) {return tip.text(d.count).style("visibility", "visible").style("top", y(d.count) - 13+ 'px' ).style("left", x(d.Airpressure) + x.bandwidth() - 12 + 'px')})
   
    .on("mouseout", function(){return tip.style("visibility", "hidden");});


    
   });
  });
});
