import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { AuthenticateComponent } from "./create-account/authenticate/authenticate.component";
import { ForgotCredentialsComponent } from "./create-account/forgot-credentials/forgot-credentials.component";
import { NeedAuthGuard } from "./gaurd/needAuthGaurd.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { PollStatsComponent } from './poll-stats/poll-stats.component';
import { PollActionComponent } from './poll-action/poll-action.component';
import { PollCreationComponent } from './poll-creation/poll-creation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [NeedAuthGuard],
    children: [
      { path: '', redirectTo: 'polls', pathMatch: 'full' },
      {
        path: "users",
        component: UsersComponent
      },
      {
        path: "polls",
        component: PollStatsComponent
      },
      {
        path: "createPoll",
        component: PollCreationComponent
      },
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "pollAction",
    component: PollActionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
