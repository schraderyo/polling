import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public hide = true;

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(res => {      
      if (res.token) {
        this.authService.setToken(res.token);
        this.router.navigate(['/', 'dashboard']);
      }
    }, error => {
      alert(error.error.error);
    });
  }
}
