import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../user.service";
import { ProjectApplicationService } from "../project-application.service";

@Component({
  selector: "app-comments-dialog",
  templateUrl: "./comments-dialog.component.html",
  styleUrls: ["./comments-dialog.component.css"],
})
export class CommentsDialogComponent {
  applications: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CommentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectApplicationService: ProjectApplicationService
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.projectId) {
      this.loadApplications(this.data.projectId);
    } else {
      console.error("No project ID provided.");
    }
  }

  loadApplications(projectId: any): void {
    this.projectApplicationService
      .getAllProjectApplicationsByProjectd(projectId)
      .subscribe(
        (response: any) => {
          this.applications = response;
        },
        (error: any) => {
          console.error("Error loading applications:", error);
        }
      );
  }

  updateProjectApplicationStatus(id: number, status: string): void {
    this.projectApplicationService
      .updateProjectApplicationStatus(id, status)
      .subscribe(
        (response: any) => {
          // Handle success
          console.log("Project application status updated:", response);
        },
        (error: any) => {
          console.error("Error updating project application status:", error);
        }
      );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
