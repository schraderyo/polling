import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  public setIncorrect: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    public changeDetectorRef: ChangeDetectorRef
    ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(res => {      
      if (res && res.token) {
        this.authService.setToken(res.token);
        this.router.navigate(['/', 'dashboard']);
      } else {
        this.setIncorrect = true
      }
    }, error => {
      alert(error.error.error);
    });
  }
}
