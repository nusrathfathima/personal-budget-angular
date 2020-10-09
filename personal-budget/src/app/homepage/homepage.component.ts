import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getMyBudget().subscribe((data: any) => {
      this.createChart(data);
    });
  }

  createChart(data): void {
    const labelsArray = [];
    const dataArray = [];
    for (let i = 0; i < data.myBudget.length; i++) {
      labelsArray[i] = data.myBudget[i].title;
      dataArray[i] = data.myBudget[i].budget;
    }
    const chartData = {
      datasets: [
          {
              data: dataArray,
              backgroundColor: [
                  '#ffcd56',
                  '#ff6384',
                  '#36a2eb',
                  '#fd6b19',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(75, 192, 192, 1)',
              ],
          }
      ],
      labels: labelsArray
    };

    const ctx = document.getElementById('myChart');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: chartData
    });
}

}
