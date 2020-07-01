import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-credentials',
  templateUrl: './forgot-credentials.component.html',
  styleUrls: ['./forgot-credentials.component.scss']
})
export class ForgotCredentialsComponent implements OnInit {
  public linkSent: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  sendLink() {
    this.linkSent = true;
  }

}
