import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { User } from "./models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "angular-frontend";

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.authService.getUserEmail().subscribe((userEmail) => {
          this.userService.getUserByEmail(userEmail).subscribe((res: User) => {
            this.userService.loggedInUser = res;
            localStorage.setItem("loggedInUser", JSON.stringify(res));
          });
        });
      }
    });
  }
}
