import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() button = '';

  constructor(private router: Router) {}

  onLogout = () => {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  };

  ngOnInit(): void {}
}
