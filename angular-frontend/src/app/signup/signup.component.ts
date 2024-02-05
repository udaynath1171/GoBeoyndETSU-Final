import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        name: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordPatternValidator,
          ],
        ],
        confirmPassword: ["", Validators.required],
        role: ["", Validators.required],
        skills: this.skills,
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get email() {
    return this.signupForm.get("email");
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

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  getErrorMessage() {
    if (this.email?.hasError("required")) {
      // Use optional chaining
      return "You must enter a value";
    }

    return this.email?.hasError("email") ? "Not a valid email" : "";
  }
  signup() {
    // Add your signup logic here
    console.log("Signing up...");
  }
}
