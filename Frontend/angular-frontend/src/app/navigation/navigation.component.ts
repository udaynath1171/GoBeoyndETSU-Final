import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent implements OnInit {
  isLoggedIn = false;
  user!: User;
  userEmail: string = "";
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.isLoggedIn) {
      this.authService.getUserEmail().subscribe((userEmail) => {
        this.userEmail = userEmail;
        this.userService
          .getUserByEmail(this.userEmail)
          .subscribe((res: User) => {
            this.userService.loggedInUser = res;
            this.user = res;
            if (this.user.role === "admin") {
              this.isAdmin = true;
            }
          });
      });
    }
  }

  logout() {
    this.authService.logout();
    window.location.reload();
    this.router.navigate(["/login"]);
  }
}
