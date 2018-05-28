import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {observable} from "rxjs/symbol/observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    //activeUser: string;
  credentialsFail = false;
    credentials = {
      username: '',
      password: ''
    };

  constructor(private authService: AuthService) {
    //this.activeUser = this.authService._user ? this.authService._user.name : 'N/A';
  }
  login() {
    // login user using authService.
    //console.log(this.credentials);

    this.authService.login(this.credentials).subscribe(() => {
      this.credentialsFail = false;
      console.log('component: ', this.credentials);
      }, (error) => {
      this.credentialsFail = true;
    });

  }
  validForm(){
    return this.credentials.username.length > 3 && this.credentials.password.length > 3;
  }

  logout() {
    this.authService.logout();
    // logout user using authService.
  }

  testApi() {
    // test API access by invoking getResource on authService.
  }
}
