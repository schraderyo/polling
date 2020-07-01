import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-poll-creation',
  templateUrl: './poll-creation.component.html',
  styleUrls: ['./poll-creation.component.scss']
})
export class PollCreationComponent implements OnInit {
  pollForm: FormGroup;
  showForm: boolean = false;
  questions = new FormArray([]);
  userId: number;
  responses: number = 0;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public changeDetectorRef: ChangeDetectorRef,
    private pollService: PollService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((event) => {
      this.userId = event.data;
      this.initializeData();
    });
  }

  initializeData() {
      if (this.userId) {
        this.getFormData().subscribe((res) => {
          this.responses = res.responses ? res.responses : this.responses;
          this.initializeFormData(res);
          this.showForm = true;
          this.changeDetectorRef.detectChanges();
        });
      } else {
        this.initializeForm();
        this.showForm = true;
        this.changeDetectorRef.detectChanges();
      }
  }

  getFormData() {
    return this.pollService.getPollById(this.userId);
  }

  initializeForm() {
    this.questions.push(new FormControl(''));
    
    const formControls = new FormGroup({
      title: new FormControl('', Validators.required),
      questions: this.questions
    });

    this.pollForm = formControls;
  }

  initializeFormData(res) {
    if (res.questions) {
      res.questions.forEach(element => {
        this.questions.push(new FormControl(element.question));
      });
    } else {
      this.questions.push(new FormControl(''));
    }

    const formControls = new FormGroup({
      title: new FormControl(res.title, Validators.required),
      questions: this.questions,
    });

    this.pollForm = formControls;
  }

  addQuestion() {
    this.questions.push(new FormControl(''));
  }

  deleteQuestion(index: number) {
    this.questions.removeAt(index)
  }

  setQuestions(questions) {
    return questions.map((question, index) => {
      return {
        id: index + 1,
        question: question,
        answer: null
      }
    });
  }

  onSubmit(form: FormGroup) {
    let questions = this.setQuestions(this.questions.value);
    let pollData = {...form.value, questions: questions, responses: this.responses};

    if (this.userId) {
      this.pollService
        .editPoll(pollData, this.userId)
        .subscribe((res) => {
          this.router.navigate(["/dashboard/polls"]);
        });
    } else {
      this.pollService.addPoll(pollData).subscribe((res) => {
        this.router.navigate(["/dashboard/polls"]);
      });
    }
  }
}
