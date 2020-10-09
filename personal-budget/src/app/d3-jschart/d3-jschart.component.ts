import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-d3-jschart',
  templateUrl: './d3-jschart.component.html',
  styleUrls: ['./d3-jschart.component.scss']
})

export class D3JSChartComponent implements OnInit {

  private data = [];

  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  private createSvg(): void {
    this.svg = d3.select('figure#d3jschart')
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    .append('g')
    .attr(
      'transform',
      'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
    );
    const labelsArray = this.dataService.dataSource.labels;
    const dataArray = this.dataService.dataSource.datasets[0].data;

    console.log(labelsArray);
    console.log(dataArray);

    for (let j = 0; j < labelsArray.length; j++) {
      this.data.push({
        title: labelsArray[j],
        budget: dataArray[j]
      });
    }
    console.log(this.data);
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    // .domain(this.data_old.map(d => d.Stars.toString()))
    .domain(this.data.map(d => d.budget.toString()))
    .range(this.dataService.dataSource.datasets[0].backgroundColor);
    // .range(['#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782']);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.budget));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr('stroke', '#121926')
    .style('stroke-width', '1px');

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('text')
    .text(d => d.data.title)
    .attr('transform', (d: d3.DefaultArcObject) => 'translate(' + labelLocation.centroid(d) + ')')
    .style('text-anchor', 'middle')
    .style('font-size', 15);
  }

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    console.log(this.dataService.dataSource);
    this.createSvg();
    this.createColors();
    this.drawChart();
  }
}
