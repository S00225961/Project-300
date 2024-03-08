import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiForStatisticsService } from '../api-for-statistics.service';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  constructor(private statApiService: ApiForStatisticsService){}
  jsonData: any = [];
  username: string = "";
  async ngOnInit() {
    //loading stats
    const sessionData = localStorage.getItem('userSession');
    if(sessionData){
      const jsonData = JSON.parse(sessionData);
      this.username = jsonData.username;
    }
    // this.statApiService.listUsers()
    // .pipe(
    //   catchError((err) => {
    //     console.error('Error fetching data:', err);
    //     return [];
    //   }),
    //   finalize(() => {
    //     console.log('Request completed.');
    //   })
    // )
    // .subscribe(
    //   (result) => {
    //     this.jsonData = JSON.parse(result.body);
    //     console.log(this.jsonData);
    //   }
    // );
    //line chart
    const lineChart = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(lineChart, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'Line Chart Showing General Trend in C02 Production',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: '#A4CE95',
          backgroundColor: '#344955',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
    //bar chart
    const barChart = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(barChart, {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: 'Bar Chart Showing C02 Produced in a Week',
            data: [12, 19, 3, 5, 2, 3, 6],
            backgroundColor: '#A4CE95',
            borderWidth: 1,
          },
        ],
        
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
    });
     //pie chart
     const pieChart = document.getElementById('pieChart') as HTMLCanvasElement;
        new Chart(pieChart, {
          type: 'pie',
          data: {
            labels: ['Food', 'Transport', 'Electricity'],
            datasets: [{
              label: 'Dataset',
              data: [12, 19, 3],
              backgroundColor: [
                '#A5DD9B',
                '#F6F193',
                '#F2C18D'
              ],
              borderColor: [
                '#A4CE95',
                '#A4CE95',
                '#A4CE95'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
        }
}

