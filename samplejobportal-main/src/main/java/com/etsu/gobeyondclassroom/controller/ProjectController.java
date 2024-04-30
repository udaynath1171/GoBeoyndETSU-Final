package com.etsu.gobeyondclassroom.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.etsu.gobeyondclassroom.model.Project;
import com.etsu.gobeyondclassroom.service.ProjectService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

	@Autowired
	private ProjectService projectService;

	@Operation(summary = "Get all projects")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found all projects", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Project.class))),
			@ApiResponse(responseCode = "404", description = "No projects found", content = @Content) })
	@GetMapping
	public ResponseEntity<List<Project>> getAllProjects() {
		List<Project> projects = projectService.getAllProjects();
		return ResponseEntity.ok(projects);
	}

	@Operation(summary = "Get a project by its ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found the project by ID", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Project.class))),
			@ApiResponse(responseCode = "404", description = "Project not found by ID", content = @Content) })
	@GetMapping("/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
		Optional<Project> project = projectService.getProjectById(id);
		return project.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "Create a new project")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "201", description = "Project created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Project.class))),
			@ApiResponse(responseCode = "400", description = "Invalid request format", content = @Content),
			@ApiResponse(responseCode = "500", description = "Internal server error", content = @Content) })
	@PostMapping
	public ResponseEntity<Project> createProject(@RequestBody Project project) {
		Project createdProject = projectService.createProject(project);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
	}

	@Operation(summary = "Update a project by its ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Project updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Project.class))),
			@ApiResponse(responseCode = "400", description = "Invalid request format", content = @Content),
			@ApiResponse(responseCode = "404", description = "Project not found by ID", content = @Content) })
	@PutMapping("/{id}")
	public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project) {
		Project updatedProject = projectService.updateProject(id, project);
		return ResponseEntity.ok(updatedProject);
	}

	@Operation(summary = "Delete a project by its ID")
	@ApiResponses(value = { @ApiResponse(responseCode = "204", description = "Project deleted successfully"),
			@ApiResponse(responseCode = "404", description = "Project not found by ID") })
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
		projectService.deleteProject(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/owner/{ownerEmailId}")
	public ResponseEntity<List<Project>> getProjectsByOwner(@PathVariable String ownerEmailId) {
		List<Project> projects = projectService.getProjectsByOwner(ownerEmailId);
		return ResponseEntity.ok(projects);
	}
//
//	@GetMapping("/participant/{participantId}")
//	public ResponseEntity<List<Project>> getProjectsByParticipant(@PathVariable Long participantId) {
//		List<Project> projects = projectService.getProjectsByParticipant(participantId);
//		return ResponseEntity.ok(projects);
//	}
}
