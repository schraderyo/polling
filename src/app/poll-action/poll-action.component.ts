import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { PollService } from "../services/poll.service";
import { Poll, PollMetrics, Question } from "../_models/polls";
import { BACKGROUNDS } from "../_constants/backgrounds";
import { MatDialog } from "@angular/material/dialog";
import { STATUS } from "../_constants/status";
import * as moment from "moment";
import { ConfirmationDialogComponent } from "../shared/components/dialog/confirmation-dialog/confirmation-dialog.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-poll-action",
  templateUrl: "./poll-action.component.html",
  styleUrls: ["./poll-action.component.scss"],
})
export class PollActionComponent implements OnInit {
  pollForm: FormGroup;
  pollData: Poll;
  pollStats: PollMetrics;
  showForm: boolean = false;
  questions: Question[] = [];
  answers = [];
  userId: number;
  pollId: number;
  background: string;

  constructor(
    private pollService: PollService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.generateRandomBackground();
    this.route.params.subscribe((event) => {
      this.userId = event.data ? event.data.userId : 1;
      this.pollId = event.data ? event.data.pollId : 1;
      this.initializeData();
    });
  }

  generateRandomBackground() {
    this.background =
      BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
  }

  initializeData() {
    this.getFormData().subscribe((res) => {
      this.pollData = res;
      this.initializeForm(res);
      this.initializeStatsData();
      this.showForm = true;
    });
  }

  initializeForm(data) {
    data.questions.forEach((element) => {
      this.questions.push(element);
      this.answers.push(null);
    });
  }

  getFormData() {
    return this.pollService.getPollById(this.userId);
  }

  initializeStatsData() {
    this.pollStats = new PollMetrics();
    this.pollStats.pollId = this.pollData.id;
    this.pollStats.status = STATUS.VIEWED;
  }

  updateStatus(index: number, value: boolean) {
    this.questions[index].answer = value;

    let incomplete = false;
    this.questions.forEach((res) => {
      if (res.answer == null) {
        incomplete = true;
      }
    });

    if (incomplete) {
      this.pollStats.status = STATUS.INPROGRESS;
    } else {
      this.pollStats.status = STATUS.COMPLETED;
    }
  }

  pollSetStatus() {
    this.pollStats.pollId = this.pollId;
    this.pollStats.userId = this.userId;
    this.pollStats.timestamp = moment().toString();
    this.pollStats.results = this.questions;
    this.pollStats.status = STATUS.COMPLETED;
    this.pollStats.title = this.pollData.title;
  }

  submitPoll() {
    this.pollService
      .addPollResponse(this.pollData, this.pollData.id)
      .subscribe((res) => {
        this.pollSetStatus();
        this.pollService.addPollStatus(this.pollStats).subscribe((res) => {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            autoFocus: false,
          });
        });
      });
  }
}
