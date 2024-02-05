import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" }, // Default route to login
  { path: "**", redirectTo: "/login" }, // Redirect to login for any other route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
