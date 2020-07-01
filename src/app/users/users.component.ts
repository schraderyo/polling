import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../_models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../shared/components/dialog/delete-dialog/delete-dialog.component';
import { PollService } from '../services/poll.service';
import { UserDialogComponent } from '../shared/components/dialog/user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  totalUsers: number;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource: User[] = undefined;
  showTable: boolean = false;
  showForm: boolean = false;
  userModel: User;
  userForm: FormGroup;
  userId: number;

  constructor(private userService: UserService, public changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.getUsers().subscribe(res => {
      this.dataSource = res;
      this.totalUsers = res.length;
      this.showTable = res.length ? true : false;
      this.changeDetectorRef.detectChanges();
    }, error => {
      console.log('error occurred');
    });
  }

    /**
   * Initialize the form by setting up validators and setting
   * Form values if editing a form item
   */
  initializeForm(user: any) {
    const formControls = new FormGroup({
      firstName: new FormControl(user.firstName, Validators.required),
      lastName: new FormControl(user.lastName, Validators.required),
      email: new FormControl(user.email, Validators.required),
    });

    this.userForm = formControls;
  }

  /**
   * Initialize user template to initialize form with out without data
   * @param user 
   */
  setUserData(user?) {
    let userTemplate = {
      firstName: user ? user.firstName : "",
      lastName: user ? user.lastName : "",
      email: user ? user.email : "",
    };
    return userTemplate;
  }

  createUser() {
    this.initializeForm(this.setUserData());
    this.userId = null;
    this.showForm = true;
  }
  
  userStats(user: User) {
    this.dialog.open(UserDialogComponent, {
      autoFocus: false,
      data: user
    });
  }

  editUser(user: User) {
    this.initializeForm(this.setUserData(user));
    this.userId = user.id;
    this.showForm = true;
  }

  deleteUser(user: User) {
    this.showForm = false;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(res => {
          this.getData();
        })
      }
    });
  }

  onSubmit(form: FormGroup) {
    this.userModel = form.value;

    if (this.userId) {
      this.userService
        .editUser(this.userModel, this.userId)
        .subscribe((res) => {
          this.getData();
          this.showForm = false;
        });
    } else {
      this.userService.addUser(this.userModel).subscribe((res) => {
        //Set as prestine so user doesn't accidently add two of same user
        this.userForm.markAsPristine();
        this.getData();
      });
    }
  }

  getUsers() {
    return this.userService.getUsers();
  }
}
