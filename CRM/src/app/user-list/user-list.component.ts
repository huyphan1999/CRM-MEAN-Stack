import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() userList: User[] = [];
  @Output() clickItemEvent = new EventEmitter<User>();
  constructor() {}

  clickItem(value: User) {
    this.clickItemEvent.emit(value);
  }

  ngOnInit(): void {}
}
