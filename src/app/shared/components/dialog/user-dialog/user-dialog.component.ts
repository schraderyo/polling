import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/_models/user';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PollService } from 'src/app/services/poll.service';
import * as moment from "moment";
import * as _ from "lodash";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  showData: boolean = false;
  userData: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private pollService: PollService) { }

  ngOnInit() {
    this.getBreakdown();
  }

  sortByDate(res: any[]) {
    return _.orderBy(res, (elem: any) => {
      return moment(elem.timeStamp);
    }, ['asc']);
  }

  getBreakdown() {
    this.pollService.getUserPollStatsById(this.data.id).subscribe(res => {
      this.userData = this.sortByDate(res);
      this.showData = true;
    });
  }
}
