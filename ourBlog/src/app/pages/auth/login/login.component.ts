import { Component, OnInit } from '@angular/core';
import { USER_INTERFACE } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  loading = false;
  hasError = false;
  errorMsg = '';

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {}

  isDisabled(): boolean {
    return !this.email || !this.password || this.loading;
  }

  login() {
    this.loading = true;
    const user = {
      email: this.email,
      password: this.password,
    };
    this.authService.login(user).subscribe(
      (result: any) => {
        const ls = window.localStorage
        this.loading = false;
        ls.setItem('token', `Bearer ${result.token}`);
        this.userService.setUser(result.user as USER_INTERFACE)


        console.log(this.userService.user())
        console.log(this.authService.loggedIn())

      },
      (error) => {
        this.loading = false;
        console.log(error)
      }
    );
  }
}
