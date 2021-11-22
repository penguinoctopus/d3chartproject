import * as d3 from 'd3'
import { genRandomDataArray } from '../functions'

const MARGIN = {top: 10, right: 30, bottom: 30, left: 40}
const WIDTH = 460 - MARGIN.left - MARGIN.right
const HEIGHT = 400 - MARGIN.top - MARGIN.bottom

export default class d3Histogram {
  constructor(root) {
    this.root = root
    this.svg = null
    this.createChart()
  }

  createChart() {
    const svg = d3.select(this.root)
      .append("svg") 
      .attr("width", WIDTH + MARGIN.left + MARGIN.right)
      .attr("height", HEIGHT + MARGIN.top + MARGIN.bottom)
      .append("g")
      .attr("transform", 
            "translate(" + MARGIN.left + "," + MARGIN.top + ")")
      
    this.svg = svg
  }

  updateChart() {
    const svg = this.svg
    const xMax = 20
    const yMax = 10
    const data = genRandomDataArray(xMax, yMax)

    const xScale = d3.scaleBand()
      .domain([...new Array(xMax)].map((_, i) => i))
      .range([0, WIDTH])
      .padding(0.4)
    svg.append("g")
      .attr("transform", "translate(0," + HEIGHT + ")")
      .call(d3.axisBottom(xScale));

    const yScale = d3.scaleLinear()
      .range([HEIGHT, 0]);
      yScale.domain([0, yMax]);

    svg.append("g")
        .call(d3.axisLeft(yScale).tickFormat(d => d).ticks(10))

    svg.selectAll("rect")
      .remove()
      .exit()
      .data(data)
      .enter()
      .append("rect")
        .attr("x", (_, i) => xScale(i))
        .attr("y", HEIGHT)
        .attr("width", xScale.bandwidth() )
        .transition()
        .delay((_,i) => i * 300)
        .duration(600)
        .attr("y", (d) => yScale(d))
        .attr("height", (d) =>  HEIGHT - yScale(d))
        .style("fill", "#f29c54")
  }
}
