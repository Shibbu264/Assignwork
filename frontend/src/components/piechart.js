// PieChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (data) {
        data=data.slice(0,4)
      const svg = d3.select(svgRef.current);
      const width = svg.attr('width');
      const height = svg.attr('height');
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3.pie()
        .value(d => d.count);

      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      const arcs = svg.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      arcs.append('path')
        .attr('fill', (d, i) => color(i))
        .attr('d', arc)
        .on('mouseover', (event, d) => {
          d3.select(tooltipRef.current)
            .html(`<strong>${d.data._id}: ${d.data.count}</strong>`)
            .style('visibility', 'visible');
        })
        .on('mousemove', (event) => {
          d3.select(tooltipRef.current)
            .style('top', `${event.pageY}px`)
            .style('left', `${event.pageX}px`);
        })
        .on('mouseout', () => {
          d3.select(tooltipRef.current)
            .style('visibility', 'hidden');
        });

    // Inside the useEffect hook, after appending the text element for each slice
arcs.append('text')
.attr('transform', d => `translate(${arc.centroid(d)})`)
.attr('text-anchor', 'middle')
.text(d => ` ${Math.round((d.endAngle - d.startAngle)/ (2 * Math.PI) * 100)}%`);

      // Tooltip
      svg.append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background', '#f9f9f9')
        .style('padding', '5px')
        .style('border', '1px solid #ccc')
        .style('border-radius', '5px')
        .style('pointer-events', 'none')
        .style('visibility', 'hidden')
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .style('color', '#333')
        .style('text-align', 'center')
        .style('z-index', '10')
        .style('max-width', '200px')
        .style('word-wrap', 'break-word')
        .style('line-height', '1.5')
        .style('box-shadow', '0 0 5px rgba(0, 0, 0, 0.3)')
        .style('white-space', 'nowrap')
        .attr('id', 'tooltip')
        .html('');

    }
  }, [data]);

  return (
    <div className=" border-x border-y px-6 p-2 flex items-center gap-[5%] justify-center">
    <div  style={{ position: 'relative' }}>
      <svg className='text-lg font-bold' ref={svgRef} width={300} height={300}></svg>
      <div className='text-center text-xl my-6' ref={tooltipRef}></div>
    </div>
    </div>
  );
};

export default PieChart;
