import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data) {
      data = data.slice(0, 9);
      const svg = d3.select(svgRef.current);
      const width = +svg.attr('width');
      const height = +svg.attr('height');

      const margin = { top: 20, right: 30, bottom: 50, left: 60 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .domain(data.map(d => d._id))
        .range([0, innerWidth])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .nice()
        .range([innerHeight, 0]);

      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const bars = g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d._id))
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', d => innerHeight - y(d.count))
        .attr('fill', 'steelblue')
        .on('mouseover', function (event, d) {
          d3.select(this).attr('fill', 'orange');
          const tooltip = g.append('text')
            .attr('x', x(d._id) + x.bandwidth() / 2)
            .attr('y', y(d.count) - 5)
            .attr('text-anchor', 'middle')
            .text(d.count)
            .style('font-weight', 'bold',).style('fill','white');
        })
        .on('mouseout', function () {
          d3.select(this).attr('fill', 'steelblue');
          g.selectAll('text').remove();
        });

      g.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);

      g.append('g')
        .call(yAxis);

      // Add y-axis grid lines
      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(''));

      g.selectAll('.y-point')
        .data(y.ticks(5)) // Adjust the number of reference points as needed
        .enter()
        .append('circle')
        .attr('class', 'y-point')
        .attr('cx', 0)
        .attr('cy', d => y(d))
        .attr('r', 3)
        .attr('fill', 'red');
    }
  }, [data]);

  return (
    <div className="border-x border-y py-4 px-2 flex gap-[5%] justify-center">
      <svg ref={svgRef} width={800} height={400}></svg>
    </div>
  );
};

export default BarChart;
