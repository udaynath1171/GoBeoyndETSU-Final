import { Component, OnInit } from "@angular/core";
import { Project } from "../models/project";
import { ProjectService } from "../project.service";
import { UserService } from "../user.service";
import { User } from "../models/user";
import { MatDialog } from "@angular/material/dialog";
import { ApplyDialogComponent } from "../apply-dialog/apply-dialog.component";
import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import { ProjectApplicationService } from "../project-application.service";
import { ProjectApplication } from "../models/project-application";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  projects: Project[] | undefined;
  yourProjects: any[] = [];
  canCreateProject: boolean = false;
  storedUserObject: User | undefined;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private dialog: MatDialog,
    private projectApplicationService: ProjectApplicationService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.setLoggedInUser();
  }
  setLoggedInUser() {
    if (this.userService.loggedInUser) {
      this.userRoleCheck(this.userService.loggedInUser);
    } else {
      //this.userService.loggedInUser =
      const storedUserString: any = localStorage.getItem("loggedInUser");
      // Parse the string back into an object using JSON.parse
      this.storedUserObject = JSON.parse(storedUserString);
      this.userService.loggedInUser = this.storedUserObject;
      this.userRoleCheck(this.userService.loggedInUser);
    }
  }

  userRoleCheck(user: User | undefined) {
    if (user) {
      if (user.role === "client" || user.role === "admin") {
        this.canCreateProject = true;
      } else {
        this.canCreateProject = false;
      }
    }
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error("Error loading projects:", error);
      }
    );
  }
  openApplyDialog(id: any): void {
    const dialogRef = this.dialog.open(ApplyDialogComponent, {
      width: "400px",
    });
    dialogRef.componentInstance.submitData.subscribe((data: string) => {
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          let projectApplication: ProjectApplication = {
            id: null,
            userId: this.storedUserObject ? this.storedUserObject.id : 0,
            email: this.storedUserObject ? this.storedUserObject.email : "",
            projectId: id,
            status: "pending",
            comments: data,
          };
          this.projectApplicationService
            .createProjectApplication(projectApplication)
            .subscribe({
              next: (value) => {
                console.log(value);
              },
              error(err) {
                console.log(err);
              },
            });
          console.log(result, data);
        }
      });
    });
  }
}
