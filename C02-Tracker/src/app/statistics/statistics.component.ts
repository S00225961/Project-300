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
  constructor(private apiForStats: ApiForStatisticsService){}
  jsonData: any = [];
  //user data
  username: string = "";
  userID: any; 
  userData: any;
  //stats for pie chart
  totalProductC02: number = 0;
  totalElectricityC02: number = 0;
  totalCommuteC02: number = 0;
  //stats for bar chart
  monday: number = 0;
  tuesday: number = 0;
  wednesday: number = 0;
  thursday: number = 0;
  friday: number = 0;
  saturday: number = 0;
  sunday: number = 0;
  //stats for line graph
  january: number = 0;
  february: number = 0;
  march: number = 0;
  april:number = 0;
  may:number = 0;
  june:number = 0;
  july:number = 0;
  august:number = 0;
  september:number = 0;
  october:number = 0;
  november:number = 0;
  december:number = 0;

  assigningCo2Data(sector: any, sectorType: string){
    if(sectorType == "commute"){
      this.totalCommuteC02 += Number(sector.co2Emissions);
    } else if(sectorType == "product"){
      const co2 = Number(sector.co2EmissionsPerUnit);
      this.totalProductC02 += co2;
    } else {
      this.totalElectricityC02 += Number(sector.co2Emissions);
    }
    //days
    const dateString = sector.date;
    const date = new Date(dateString);
    const dayNumber = date.getDay();
    switch (dayNumber) {
      case 0:
        //sunday
        this.sunday += sector.co2Emissions;
        break;
      case 1:
        //monday
        this.monday += sector.co2Emissions;
        break;
      case 2:
        //tuesday
        this.tuesday += sector.co2Emissions;
        break;
      case 3:
        //wednesday
        this.wednesday += sector.co2Emissions;
        break;
      case 4:
        //thursday
        this.thursday += sector.co2Emissions;
        break;
      case 5:
        //friday
        this.friday += sector.co2Emissions;
        break;
      case 6:
        //saturday
        this.saturday += sector.co2Emissions;
        break;
      default:
        console.log("Invalid day");
    }
    //months
    const monthNumber = date.getMonth();
    switch (monthNumber) {
      case 1:
        //january
        this.january += sector.co2Emissions;
        break;
      case 2:
       //february
       this.february += sector.co2Emissions;
        break;
      case 3:
        //march
       this.march += sector.co2Emissions;
        break;
      case 4:
        //april
       this.april += sector.co2Emissions;
        break;
      case 5:
        //may
       this.may += sector.co2Emissions;
        break;
      case 6:
        //june
       this.june += sector.co2Emissions;;
        break;
      case 7:
        //july
       this.july += sector.co2Emissions;
        break;
      case 8:
        //august
       this.august += sector.co2Emissions;
        break;
      case 9:
        //september
       this.september += sector.co2Emissions;
        break;
      case 10:
        //october
       this.october += sector.co2Emissions;
        break;
      case 11:
        //november
       this.november += sector.co2Emissions;
        break;
      case 12:
        //december
       this.december += sector.co2Emissions;
        break;
      default:
        console.log("Invalid month");
    }

  }
  async getCommuteData() {
    //commute
    this.apiForStats.getTransportByUserID(this.userID)
    .pipe(
      catchError((err) => {
        console.error('Error fetching data:', err);
        return [];
      }),
      finalize(() => {
        console.log('Request completed.');
      })
    )
    .subscribe(
      (result) => {
        result.forEach((commute: any) => {
          this.assigningCo2Data(commute, "commute");
        });
      }
    );
  }
  async getElectricityData(){
    //electricity
    this.apiForStats.getElectricityRecordsByUserID(this.userID)
    .pipe(
      catchError((err) => {
        console.error('Error fetching data:', err);
        return [];
      }),
      finalize(() => {
        console.log('Request completed.');
      })
    )
    .subscribe(
      (result) => {
        result.forEach((electricity: any) => {
          this.assigningCo2Data(electricity, "electricity");
        });
      }
    );
  }
  async getProductData() : Promise<any>{
    //products
    this.apiForStats.getFoodProductsByUserID(this.userID)
    .pipe(
      catchError((err) => {
        console.error('Error fetching data:', err);
        return [];
      }),
      finalize(() => {
        console.log('Request completed.');
      })
    )
    .subscribe(
      (result) => {
        result.forEach((product: any) => {
          this.assigningCo2Data(product, "product");
        });
      }
    );
  }
  
  async ngOnInit() {
    const localStorageData = localStorage.getItem('getUserIDByUsername');
    if(localStorageData){
      this.userData = JSON.parse(localStorageData);
      this.userID = this.userData.userID;
    }
    //loading stats
    const sessionData = localStorage.getItem('userSession');
    if(sessionData){
      const jsonData = JSON.parse(sessionData);
      this.username = jsonData.username;
    }
    await this.getStatData();
    this.startCheckingValue();
  }
  async getStatData(){
    try {
      this.getCommuteData();
      this.getElectricityData();
      this.getProductData();
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } 
  }
  startCheckingValue(): void {
    const intervalId = setInterval(() => {
      if (this.totalProductC02 !== 0 && this.totalCommuteC02 !== 0 && this.totalElectricityC02 !== 0) {
        clearInterval(intervalId);
        this.initializeCharts();
      }
    }, 200); 
  }
  initializeCharts(){
    //line chart
    const lineChart = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(lineChart, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'General Trend in C02 Production',
          data: [this.january, this.february, this.march, this.april, this.may, this.june, this.july, this.august, this.september, this.october, this.november, this.december],
          borderColor: '#A4CE95',
          backgroundColor: '#344955',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              boxWidth: 20
            }
          }
        },
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
            label: 'C02 Produced in a Week',
            data: [this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday],
            backgroundColor: '#A4CE95',
            borderWidth: 1,
          },
        ],
        
      },
      options: {
        plugins: {
          legend: {
            labels: {
              boxWidth: 20
            }
          }
        },
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
              data: [this.totalProductC02, this.totalCommuteC02, this.totalElectricityC02],
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
            plugins: {
              legend: {
                labels: {
                  boxWidth: 20
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false
          }
        });

  }
}

