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
import { CommentsDialogComponent } from "../comments-dialog/comments-dialog.component";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.css"],
})
export class ProjectListComponent implements OnInit {
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
        this.loadProjects(this.userService.loggedInUser);
      } else {
        this.canCreateProject = false;
        this.loadAppliedProjects(this.userService.loggedInUser);
      }
    }
  }

  loadProjects(user: User | undefined): void {
    this.projectService.getAllProjectsByOwner(user ? user.email : "").subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error("Error loading projects:", error);
      }
    );
  }

  loadAppliedProjects(user: User | undefined): void {
    this.projectApplicationService
      .getAllProjectApplicationsByUserId(user ? user.id : 0)
      .subscribe(
        (projects) => {
          this.projects = projects;
        },
        (error) => {
          console.error("Error loading projects:", error);
        }
      );
  }
  // openApplyDialog(id: any): void {
  //   const dialogRef = this.dialog.open(ApplyDialogComponent, {
  //     width: "400px",
  //   });
  //   dialogRef.componentInstance.submitData.subscribe((data: string) => {
  //     dialogRef.afterClosed().subscribe((result) => {
  //       if (result) {
  //         let projectApplication: ProjectApplication = {
  //           id: null,
  //           userId: this.storedUserObject ? this.storedUserObject.id : 0,
  //           email: this.storedUserObject ? this.storedUserObject.email : "",
  //           projectId: id,
  //           status: "pending",
  //           comments: data,
  //         };
  //         this.projectApplicationService
  //           .createProjectApplication(projectApplication)
  //           .subscribe({
  //             next: (value) => {
  //               console.log(value);
  //             },
  //             error(err) {
  //               console.log(err);
  //             },
  //           });
  //         console.log(result, data);
  //       }
  //     });
  //   });
  // }

  openDeleteDialog(id: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: "400px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectService.deleteProject(id).subscribe({
          next: (res) => {
            this.loadProjects(this.userService.loggedInUser);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {},
        });
      }
    });
  }

  openCommentsDialog(id: any): void {
    const dialogRef = this.dialog.open(CommentsDialogComponent, {
      width: "400px",
      data: { projectId: id },
    });
  }

  // deleteProject(id: number): void {
  //   if (confirm('Are you sure you want to delete this project?')) {
  //     this.projectService.deleteProject(id).subscribe(
  //       () => {
  //         console.log('Project deleted successfully!');
  //         this.loadProjects(); // Reload projects after deletion
  //       },
  //       error => {
  //         console.error('Error deleting project:', error);
  //       }
  //     );
  //   }
  // }
}
