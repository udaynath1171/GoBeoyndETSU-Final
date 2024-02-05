import { Component } from "@angular/core";
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm!: FormGroup; // Use the non-null assertion operator

  hide = true;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
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
  }
}
