import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SignupComponent } from "./signup/signup.component";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpClientModule } from "@angular/common/http";
import { ApprovalDashboardComponent } from "./approval-dashboard/approval-dashboard.component";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NavigationComponent } from "./navigation/navigation.component";
import { ProjectFormComponent } from "./project-form/project-form.component";
import { ProjectListComponent } from "./project-list/project-list.component";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { ApplyDialogComponent } from "./apply-dialog/apply-dialog.component";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { HomeComponent } from "./home/home.component";
import { CommentsDialogComponent } from './comments-dialog/comments-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ApprovalDashboardComponent,
    NavigationComponent,
    ProjectFormComponent,
    ProjectListComponent,
    ApplyDialogComponent,
    DeleteDialogComponent,
    HomeComponent,
    CommentsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    HttpClientModule,
    MatTableModule,
    MatToolbarModule,
    MatChipsModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
