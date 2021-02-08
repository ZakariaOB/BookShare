import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Books sharing App';
  users: any;
  navigationEndEvent: NavigationEnd;

  constructor(
    private accountService: AccountService,
    private presence: PresenceService,
    private router: Router
  ) {}

  get isNotSandbox(): boolean {
    return this.navigationEndEvent?.url !== '/sandbox';
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.navigationEndEvent = event as NavigationEnd;
      });
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
  }
}
