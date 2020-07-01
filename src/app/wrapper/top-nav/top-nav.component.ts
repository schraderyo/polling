import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit() { 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}