import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  public accountType: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  createAccount() {
    //TODO: API for create account then login
    this.router.navigate(['/', 'dashboard']);
  }
}
