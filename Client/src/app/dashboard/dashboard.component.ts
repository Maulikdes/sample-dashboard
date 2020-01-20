import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    // Pie
    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public pieChartUserLabels: Label[];
    public pieChartRoleLabels: Label[];
    public pieChartUserData: SingleDataSet;
    public pieChartRoleData: SingleDataSet;
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];
    public statusCount = {};
    public roleCount = {};
    public pieChartUserColors: Array < any > = [{
      backgroundColor: []}];
    public pieChartRoleColors: Array < any > = [{
        backgroundColor: []}];

    constructor(private userService : UserService) {
      userService.getUsers().subscribe( data => {
        data.map(user => {
          if(this.statusCount[user.status]){
            this.statusCount[user.status] += 1;
          }else{
            this.statusCount[user.status] = 1;

            // set color order as per the status
            if(user.status=='Active'){
              this.pieChartUserColors[0].backgroundColor.push("#2979FF");
            }else if(user.status=='Inactive'){
              this.pieChartUserColors[0].backgroundColor.push("#FFAF29");
            }else{
              this.pieChartUserColors[0].backgroundColor.push("#FFCB76");
            }
          }
          if(this.roleCount[user.role]){
            this.roleCount[user.role] += 1;
          }else{
            this.roleCount[user.role] = 1;
            if(user.role=='Admin'){
              this.pieChartRoleColors[0].backgroundColor.push("#1f3057");
            }else{
              this.pieChartRoleColors[0].backgroundColor.push("#E3E3E3");
            }
          }
        });
        this.pieChartUserLabels = Object.keys(this.statusCount);
        this.pieChartUserData = [...Object.values(this.statusCount)];

        this.pieChartRoleLabels = Object.keys(this.roleCount);
        this.pieChartRoleData = [...Object.values(this.roleCount)];

        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
      });
    }
  
    ngOnInit() {
    }
}
