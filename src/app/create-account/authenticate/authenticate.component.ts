import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-authenticate",
  templateUrl: "./authenticate.component.html",
  styleUrls: ["./authenticate.component.scss"]
})
export class AuthenticateComponent implements OnInit {
  public verificationSent: boolean = false;
  constructor() {}

  ngOnInit() {}

  sendVerification() {
    this.verificationSent = true;
  }
}
