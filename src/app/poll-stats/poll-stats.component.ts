import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Poll } from "../_models/polls";
import { PollService } from "../services/poll.service";
import { MatDialog } from "@angular/material/dialog";
import { DeleteDialogComponent } from "../shared/components/dialog/delete-dialog/delete-dialog.component";
import { ExportDialogComponent } from "../shared/components/dialog/export-dialog/export-dialog.component";
import { Router } from '@angular/router';
import { StatsDialogComponent } from '../shared/components/dialog/stats-dialog/stats-dialog.component';

@Component({
  selector: "app-poll-stats",
  templateUrl: "./poll-stats.component.html",
  styleUrls: ["./poll-stats.component.scss"],
})
export class PollStatsComponent implements OnInit {
  totalPolls: number;
  displayedColumns: string[] = ["id", "title", "responses", "actions"];
  dataSource: Poll[] = undefined;
  showTable: boolean = false;

  constructor(
    private pollService: PollService,
    public changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.getPolls().subscribe(
      (res) => {
        this.dataSource = res;
        this.totalPolls = res.length;
        this.showTable = res.length ? true : false;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.log("error occurred");
      }
    );
  }

  getPolls() {
    return this.pollService.getPolls();
  }

  getStats(poll: Poll) {
    this.dialog.open(StatsDialogComponent, {
      data: poll,
      autoFocus: false,
    });
  }

  exportPoll(poll: Poll) {
    this.dialog.open(ExportDialogComponent, {
      data: poll,
      autoFocus: false,
    });
  }

  editPoll(poll: Poll) {
    this.router.navigate(["/dashboard/createPoll", { data: poll.id }]);
  }

  deletePoll(poll: Poll) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pollService.deletePoll(poll.id).subscribe((res) => {
          this.getData();
        });
      }
    });
  }
}
