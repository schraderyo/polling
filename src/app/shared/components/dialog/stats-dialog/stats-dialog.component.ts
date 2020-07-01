import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Poll, Breakdown } from 'src/app/_models/polls';
import { PollService } from 'src/app/services/poll.service';

@Component({
  selector: 'app-stats-dialog',
  templateUrl: './stats-dialog.component.html',
  styleUrls: ['./stats-dialog.component.scss']
})
export class StatsDialogComponent implements OnInit {
  showStats: boolean = false;
  breakdown: string[] = [];
  breakdownPos: any[] = [];
  breakdownNeg: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Poll, private pollService: PollService) { }

  ngOnInit() {
    this.showStats = this.data.responses > 0 ? true : false;
    if (this.showStats) {
      this.getBreakdown();
    }
  }

  getBreakdown() {
    this.pollService.getPollStatsById(this.data.id).subscribe(res => {
      let counter = res.length;
      if (res) {
        res.forEach(element => {
          if (element.results) {
            element.results.forEach((element, index) => {
              if (element.answer === true) {
                this.breakdownPos[index] = this.breakdownPos[index] ? this.breakdownPos[index] + 1 : 1;
              } else if (element.answer === false) {
                this.breakdownNeg[index] = this.breakdownNeg[index] ? this.breakdownNeg[index] + 1 : 1;
              }
            });
          }
        });
        for (let index = 0; index < res[0].results.length; index++) {
          this.breakdown[index] = res[0].results[index].question;
          this.breakdownNeg[index] = this.breakdownNeg[index] ? Math.round((this.breakdownNeg[index] / counter) * 100): 0;
          this.breakdownPos[index] = this.breakdownPos[index] ? Math.round((this.breakdownPos[index] / counter) * 100): 0;
        }
        
        this.showStats = true;
      } else {
        this.showStats = false;
      }
    });
  }
}
