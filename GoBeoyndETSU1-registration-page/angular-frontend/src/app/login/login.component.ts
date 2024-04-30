import { HttpClient } from "@angular/common/http";
import { Component, HostListener } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm!: FormGroup; // Use the non-null assertion operator

  hide = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("", [Validators.required]),
    });
  }

  @HostListener("document:keydown.enter", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();
    this.login();
  }

  togglePasswordVisibility(event: Event) {
    event.stopPropagation();
    this.hide = !this.hide;
    event.preventDefault();
  }

  get email() {
    return this.loginForm.get("email");
  }

  getErrorMessage() {
    if (this.email?.hasError("required")) {
      // Use optional chaining
      return "You must enter a value";
    }

    return this.email?.hasError("email") ? "Not a valid email" : "";
  }

  login() {
    // Implement your login logic here
    console.log("Logging in...");
    if (this.loginForm.valid) {
      const formData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      console.log(formData);
      // Make HTTP POST request to your API
      this.authService.login(formData).subscribe(
        (response) => {
          this.userService
            .getUserByEmail(this.loginForm.value.email)
            .subscribe({
              next: (value) => {
                this.userService.loggedInUser = value;
              },
              error: (err) => {
                console.log(err);
              },
            });
          console.log("API response:", response);
          // Optionally, reset the form after successful login
          this.loginForm.reset();
          this.router.navigate(["/home"]);
          // Optionally, redirect the user to another page
        },
        (error) => {
          console.error("API error:", error);
          this.openSnackBar("Invalid credentials");
          // Optionally, handle the error (e.g., display error message to the user)
        }
      );
    } else {
      // Form is invalid, handle accordingly (e.g., display error message)
    }
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: "center", // Position horizontally
      verticalPosition: "bottom", // Position vertically at the bottom
      panelClass: ["custom-snackbar"], // Custom CSS class
    });
  }
}
