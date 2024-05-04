package com.etsu.gobeyondclassroom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.etsu.gobeyondclassroom.model.Project;
import com.etsu.gobeyondclassroom.model.ProjectApplication;
import com.etsu.gobeyondclassroom.service.ProjectApplicationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("api/projectApplications")
public class ProjectApplicationController {

	@Autowired
	private ProjectApplicationService projectApplicationService;

	// Create a new project application
	@Operation(summary = "Create a new project application")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Project application created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectApplication.class))),
			@ApiResponse(responseCode = "400", description = "Invalid request format", content = @Content),
			@ApiResponse(responseCode = "500", description = "Internal server error", content = @Content) })
	@PostMapping("/")
	public ResponseEntity<ProjectApplication> createProjectApplication(
			@RequestBody ProjectApplication projectApplication) {
		ProjectApplication createdProjectApplication = projectApplicationService
				.createProjectApplication(projectApplication);
		return ResponseEntity.ok(createdProjectApplication);
	}

	@Operation(summary = "Get all project applications")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found all project applications", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectApplication.class))),
			@ApiResponse(responseCode = "404", description = "No project applications found", content = @Content) })
	@GetMapping("/")
	public ResponseEntity<List<ProjectApplication>> getAllProjectApplications() {
		List<ProjectApplication> projectApplications = projectApplicationService.getAllProjectApplications();
		return ResponseEntity.ok(projectApplications);
	}

	@Operation(summary = "Get a project application by its ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found the project application by ID", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectApplication.class))),
			@ApiResponse(responseCode = "404", description = "Project application not found by ID", content = @Content) })
	@GetMapping("/{id}")
	public ResponseEntity<ProjectApplication> getProjectApplicationById(@PathVariable Long id) {
		ProjectApplication projectApplication = projectApplicationService.getProjectApplicationById(id);
		if (projectApplication != null) {
			return ResponseEntity.ok(projectApplication);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@Operation(summary = "Update a project application by its ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Project application updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectApplication.class))),
			@ApiResponse(responseCode = "400", description = "Invalid request format", content = @Content),
			@ApiResponse(responseCode = "404", description = "Project application not found by ID", content = @Content) })
	@PutMapping("/{id}")
	public ResponseEntity<ProjectApplication> updateProjectApplication(@PathVariable Long id,
			@RequestBody ProjectApplication projectApplicationDetails) {
		ProjectApplication updatedProjectApplication = projectApplicationService.updateProjectApplication(id,
				projectApplicationDetails);
		if (updatedProjectApplication != null) {
			return ResponseEntity.ok(updatedProjectApplication);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@Operation(summary = "Delete a project application by its ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "204", description = "Project application deleted successfully"),
			@ApiResponse(responseCode = "404", description = "Project application not found by ID") })
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProjectApplication(@PathVariable Long id) {
		projectApplicationService.deleteProjectApplication(id);
		return ResponseEntity.noContent().build();
	}

	@Operation(summary = "Change the status of a project application")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Project application status updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectApplication.class))),
			@ApiResponse(responseCode = "400", description = "Invalid request format", content = @Content),
			@ApiResponse(responseCode = "404", description = "Project application not found by ID", content = @Content) })
	@PutMapping("/{id}/status")
	public ResponseEntity<ProjectApplication> updateProjectApplicationStatus(@PathVariable Long id,
			@RequestParam String status) {
		ProjectApplication updatedProjectApplication = projectApplicationService.updateProjectApplicationStatus(id,
				status);
		if (updatedProjectApplication != null) {
			return ResponseEntity.ok(updatedProjectApplication);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@Operation(summary = "Get all project applications for a given project ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found all project applications for the given project ID", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectApplication.class))),
			@ApiResponse(responseCode = "404", description = "No project applications found for the given project ID", content = @Content) })
	@GetMapping("/byProjectId/{projectId}")
	public ResponseEntity<List<ProjectApplication>> getProjectApplicationsByProjectId(@PathVariable Long projectId) {
		List<ProjectApplication> projectApplications = projectApplicationService
				.getProjectApplicationsByProjectId(projectId);
		return ResponseEntity.ok(projectApplications);
	}

	@Operation(summary = "Get all project applications for a given user ID with approved status")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found all project applications for the given user ID with approved status", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectApplication.class))),
			@ApiResponse(responseCode = "404", description = "No project applications found for the given user ID with approved status", content = @Content) })
	@GetMapping("/byUserIdAndStatus/{userId}")
	public ResponseEntity<List<Project>> getProjectApplicationsByUserIdAndStatus(@PathVariable Long userId) {
		List<Project> projects = projectApplicationService
				.getProjectsByUserIdAndStatus(userId, "approved");
		return ResponseEntity.ok(projects);
	}

}
