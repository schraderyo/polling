import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { WrapperComponent } from "./wrapper/wrapper.component";
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TopNavComponent } from "./wrapper/top-nav/top-nav.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { SingletonModule } from './shared/singleton.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticateComponent } from './create-account/authenticate/authenticate.component';
import { ForgotCredentialsComponent } from './create-account/forgot-credentials/forgot-credentials.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { NeedAuthGuard } from './gaurd/needAuthGaurd.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { PollStatsComponent } from './poll-stats/poll-stats.component';
import { PollActionComponent } from './poll-action/poll-action.component';
import { PollCreationComponent } from './poll-creation/poll-creation.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    SingletonModule,
    HttpClientModule,
    HammerModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    PollStatsComponent,
    PollActionComponent,
    PollCreationComponent,
    WrapperComponent,
    TopNavComponent,
    CreateAccountComponent,
    AuthenticateComponent,
    ForgotCredentialsComponent,
    DashboardComponent,
    UsersComponent
  ],
  providers: [AuthService, UserService, NeedAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}