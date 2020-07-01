import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/_models/user";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-export-dialog",
  templateUrl: "./export-dialog.component.html",
  styleUrls: ["./export-dialog.component.scss"],
})
export class ExportDialogComponent implements OnInit {
  users: User[];
  showForm: boolean = false;
  showExportLink: boolean = false;
  exportLink: string;
  selectedUser: number;
  selectedPoll: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    public router: Router
  ) {}

  ngOnInit() {
    this.selectedPoll = this.data.id;
    this.getUsers().subscribe((res) => {
      this.users = res;
      this.selectedUser = res[0].id;
      this.showForm = true;
    });
  }

  getUsers() {
    return this.userService.getUsers();
  }

  getExportLink() {
    this.showExportLink = true;
    this.exportLink = environment.host + '/pollAction;userId='+ this.selectedUser +';pollId=' + this.selectedPoll;
  }

  navigateToUrl() {
    const url = this.router.serializeUrl(this.router.createUrlTree(["/pollAction", { userId: this.selectedUser, pollId: this.selectedPoll } ]));
    window.open(url);
  }

  copyUrl() {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = this.exportLink;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }
}
