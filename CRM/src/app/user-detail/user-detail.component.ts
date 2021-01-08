import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { User } from 'src/app/model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnChanges {
  @Input() user: User = {
    name: '',
    status: '',
    email: '',
    contact: '',
    website: '',
    phone: '',
    address: '',
    notes: '',
  };
  inputUser: User = {
    name: '',
    status: '',
    email: '',
    contact: '',
    website: '',
    phone: '',
    address: '',
    notes: '',
  };

  submitted: boolean = false;

  @Input() isEdit: boolean = false;
  @Input() reloadList: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.inputUser = { ...this.user };
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['user'] && this.user) {
      //your logic work when input change
      console.log(changes);
      this.inputUser = {
        name: '',
        status: '',
        email: '',
        contact: '',
        website: '',
        phone: '',
        address: '',
        notes: '',
        ...this.user,
      };
    }
  }

  createUser(): void {
    try {
      if (!this.isEdit) {
        this.userService.create(this.inputUser).subscribe(
          (response) => {
            console.log(response);
            this.inputUser = {
              name: '',
              status: '',
              email: '',
              contact: '',
              website: '',
              phone: '',
              address: '',
              notes: '',
            };
            this.reloadList();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  save(): void {
    if (this.isEdit) {
      this.userService.save(this.inputUser).subscribe(
        (response) => {
          console.log(response);
          this.reloadList();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  del(): void {
    if (this.isEdit) {
      this.userService.del(this.inputUser).subscribe(
        (response) => {
          console.log(response);
          this.reloadList();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
