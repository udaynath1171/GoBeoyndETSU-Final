import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent {
  signupForm!: FormGroup;
  hide = true;
  skills = new FormControl([]);
  skillOptions: string[] = [
    "Java",
    "Angular",
    ".NET",
    "Microservices",
    "ReactJS",
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, this.emailValidator]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            // this.passwordPatternValidator,
          ],
        ],
        confirmPassword: ["", Validators.required],
        role: ["", Validators.required],
        skills: this.skills,
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator for email pattern
  emailValidator(control: FormControl): { [s: string]: boolean } | null {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+(.com)$/;
    if (control.value && !control.value.match(emailPattern)) {
      return { invalidEmail: true };
    }
    return null;
  }

  // Custom validator for password pattern
  passwordPatternValidator(control: any): { [key: string]: boolean } | null {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (control.value && !passwordPattern.test(control.value)) {
      return { invalidPassword: true };
    }
    return null;
  }

  // Custom validator for password match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get("password")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;

    if (password !== confirmPassword) {
      group.get("confirmPassword")?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      group.get("confirmPassword")?.setErrors(null);
      return null;
    }
  }

  getErrorMessage(controlName: string) {
    const control = this.signupForm.get(controlName);

    // if (control && (control.dirty || control.touched)) {
    if (controlName === "firstName" || controlName === "lastName") {
      if (control?.hasError("required")) {
        return "You must enter a value";
      }
    }

    if (controlName === "email") {
      if (control?.hasError("required")) {
        return "You must enter a value";
      }
      if (control?.hasError("invalidEmail")) {
        return "Email pattern invalid";
      }

      return control?.hasError("email") ? "Not a valid email" : "";
    }

    if (controlName === "password") {
      if (control?.hasError("required")) {
        return "Password is required";
      }

      if (control?.hasError("minlength")) {
        return "Minimum 8 characters required";
      }

      if (control?.hasError("invalidPassword")) {
        return "Invalid password pattern";
      }
    }
    // }
    return ""; // Default return
  }

  showSuccessToast() {
    console.log("success");
    this.snackBar.open("Wait for admin's approval", "Close", {
      duration: 5000, // Adjust the duration as needed
      panelClass: ["success-toast"], // Optional: Add custom CSS class for styling
    });
  }

  signup() {
    console.log("Signing up...");
    if (this.signupForm.valid) {
      const formData = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        role: this.signupForm.value.role,
        technologyNames: this.signupForm.value.skills,
      };
      console.log(formData);
      this.http
        .post("http://localhost:8080/api/users/register", formData, {
          responseType: "text",
        })
        .subscribe(
          (response) => {
            this.router.navigate(["/login"]);
            this.showSuccessToast();
            console.log("API response:", response);
            // Optionally, reset the form after successful submission
            this.signupForm.reset();
            // Optionally, show a success message to the user
          },
          (error) => {
            this.showSuccessToast();
            console.error("API error:", error);
            // Optionally, handle the error (e.g., display error message to the user)
          }
        );
    }
  }
}
