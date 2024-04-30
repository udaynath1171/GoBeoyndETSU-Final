import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { ApprovalDashboardComponent } from "./approval-dashboard/approval-dashboard.component";
import { AuthGuard } from "./auth.guard";
import { ProjectFormComponent } from "./project-form/project-form.component";
import { ProjectListComponent } from "./project-list/project-list.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "approval-dashboard",
    component: ApprovalDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "projects",
    component: ProjectListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "projects/new",
    component: ProjectFormComponent,
    canActivate: [AuthGuard],
  },
  // { path: "projects/:id/edit", component: ProjectFormComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }, // Default route to login
  { path: "**", redirectTo: "/home" }, // Redirect to login for any other route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
