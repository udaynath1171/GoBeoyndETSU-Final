package com.etsu.gobeyondclassroom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.etsu.gobeyondclassroom.model.Technology;
import com.etsu.gobeyondclassroom.service.TechnologyService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/technologies")
public class TechnologyController {

	@Autowired
	private TechnologyService technologyService;

	@Operation(summary = "Create a new technology")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "201", description = "Technology created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Technology.class))),
			@ApiResponse(responseCode = "400", description = "Invalid request format", content = @Content),
			@ApiResponse(responseCode = "500", description = "Internal server error", content = @Content) })
	@PostMapping
	public ResponseEntity<Technology> createTechnology(@RequestBody Technology technology) {
		Technology createdTechnology = technologyService.createTechnology(technology);
		return new ResponseEntity<>(createdTechnology, HttpStatus.CREATED);
	}

	@Operation(summary = "Get a technology by its ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found the technology by ID", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Technology.class))),
			@ApiResponse(responseCode = "404", description = "Technology not found by ID", content = @Content) })
	@GetMapping("/{id}")
	public ResponseEntity<Technology> getTechnology(@PathVariable Long id) {
		Technology technology = technologyService.getTechnology(id);
		if (technology != null) {
			return new ResponseEntity<>(technology, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@Operation(summary = "Get all technologies")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found all technologies", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Technology.class))),
			@ApiResponse(responseCode = "404", description = "No technologies found", content = @Content) })
	@GetMapping
	public ResponseEntity<List<Technology>> getAllTechnologies() {
		List<Technology> technologies = technologyService.getAllTechnologies();
		if (!technologies.isEmpty()) {
			return new ResponseEntity<>(technologies, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@Operation(summary = "Create multiple technologies")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "201", description = "Technologies created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Technology.class))),
			@ApiResponse(responseCode = "400", description = "Invalid request format", content = @Content),
			@ApiResponse(responseCode = "500", description = "Internal server error", content = @Content) })
	@PostMapping("/createMultipleTechnologies")
	public ResponseEntity<List<Technology>> createMultipleTechnologies(@RequestBody List<Technology> technologies) {
		List<Technology> createdTechnologies = technologyService.createMultipleTechnologies(technologies);
		return new ResponseEntity<>(createdTechnologies, HttpStatus.CREATED);
	}

	// Implement other CRUD operations like update and delete

}
