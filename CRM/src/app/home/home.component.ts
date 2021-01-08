import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userList: User[] = [
    { id: '123123', name: 'Test', notes: 'cccccc' },
    { id: '123123', name: 'Test', notes: 'cccccc' },
    { id: '123123', name: 'Test', notes: 'cccccc' },
  ];
  user: User;
  isEdit: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.reloadList();
  }
  clickItem(value: User) {
    this.user = value;
    this.isEdit = true;
  }
  reloadList = () => {
    this.userService
      .getListUser()
      .subscribe((userList: User[]) => (this.userList = userList));
  };
}
