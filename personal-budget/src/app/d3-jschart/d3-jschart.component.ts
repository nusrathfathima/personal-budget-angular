import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-d3-jschart',
  templateUrl: './d3-jschart.component.html',
  styleUrls: ['./d3-jschart.component.scss']
})

export class D3JSChartComponent implements OnInit {

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
  }

  private createColors(data): void {
    this.colors = d3.scaleOrdinal()
    .domain(data.myBudget.map(d => d.budget.toString()))
    .range([
      '#ffcd56',
      '#ff6384',
      '#36a2eb',
      '#fd6b19',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(75, 192, 192, 1)',
      ]
    );
  }

  private drawChart(data): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.budget));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(data.myBudget))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(this.radius / 3)
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
    .data(pie(data.myBudget))
    .enter()
    .append('text')
    .text(d => d.data.title)
    .attr('transform', (d: d3.DefaultArcObject) => 'translate(' + labelLocation.centroid(d) + ')')
    .style('text-anchor', 'middle')
    .style('font-size', 15);
  }

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getMyBudget().subscribe((data: any) => {
      this.createSvg();
      this.createColors(data);
      this.drawChart(data);
      });
  }
}
