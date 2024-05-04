import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "../project.service";
import { Project } from "../models/project";
import { Technology } from "../models/technology";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: ["./project-form.component.css"],
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  isEditing: boolean = false;
  projectId!: number;
  technologyOptions: Technology[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loadTechnologies();
    this.initForm();
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.projectId = params["id"];
        this.isEditing = true;
        this.loadProject(this.projectId);
      }
    });
  }

  initForm(): void {
    this.projectForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      expectedStartDate: ["", Validators.required],
      expectedCompletionDate: ["", Validators.required],
      additionalDocumentation: [null],
      technologies: [[]], // Initialize as empty array for multiselect
    });
  }

  loadProject(id: number): void {
    this.projectService.getProjectById(id).subscribe(
      (project) => {
        // this.projectForm.patchValue(project); // Pre-populate form fields with project data
      },
      (error) => {
        console.error("Error loading project:", error);
      }
    );
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      if (this.isEditing) {
        // this.projectService.updateProject(this.projectId, formData).subscribe(
        //   () => {
        //     console.log('Project updated successfully!');
        //     this.router.navigate(['/projects']); // Redirect to projects list after update
        //   },
        //   error => {
        //     console.error('Error updating project:', error);
        //   }
        // );
      } else {
        const project: Project = {
          title: formData.title,
          description: formData.description,
          expectedStartDate: new Date(formData.expectedStartDate),
          expectedCompletionDate: new Date(formData.expectedCompletionDate),
          status: "Pending", // Assuming you have a default status
          owner: localStorage.getItem("userEmail"), // You need to set the owner separately based on your application logic
          technologies: formData.technologies.map((tech: any) => tech.name),
          additionalDocumentation: null,
          id: null,
        };
        console.log(project);
        this.projectService.createProject(project).subscribe({
          next: (res) => {
            this.router.navigate(["/projects"]);
            console.log(res);
          },
          error(err) {
            console.log(err);
          },
        });
      }
    } else {
      console.log(this.projectForm.value);
      // Form is invalid, display validation errors
      // You can implement this based on Angular's form validation features
    }
  }

  loadTechnologies(): void {
    this.projectService.getAllTechnologies().subscribe({
      next: (res) => {
        this.technologyOptions = res;
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
