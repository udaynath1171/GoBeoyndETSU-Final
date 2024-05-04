package com.etsu.gobeyondclassroom.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.etsu.gobeyondclassroom.dto.UserLoginRequest;
import com.etsu.gobeyondclassroom.dto.UserRegistrationRequest;
import com.etsu.gobeyondclassroom.model.User;
import com.etsu.gobeyondclassroom.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@Operation(summary = "Register a new user")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "User registered successfully"),
			@ApiResponse(responseCode = "400", description = "Invalid request format", content = @Content),
			@ApiResponse(responseCode = "500", description = "Internal server error", content = @Content) })
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest request) {
		userService.registerUser(request.getFirstName(), request.getLastName(), request.getEmail(),
				request.getPassword(), request.getRole(), request.getTechnologyNames());
		return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
	}

	@Operation(summary = "Login a user")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Login successful"),
			@ApiResponse(responseCode = "401", description = "Invalid credentials", content = @Content) })
	@PostMapping("/login")
	public ResponseEntity<String> loginUser(@RequestBody UserLoginRequest request) {
		// Validate the request and handle errors if needed
		boolean authenticated = userService.authenticateUser(request.getUsername(), request.getEmail(),
				request.getPassword());
		if (authenticated) {
			return new ResponseEntity<>("Login successful", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
		}
	}

	@Operation(summary = "Update user status by user ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "User status updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
			@ApiResponse(responseCode = "400", description = "Invalid status", content = @Content),
			@ApiResponse(responseCode = "404", description = "User not found", content = @Content) })
	@PutMapping("/{userId}/status")
	public ResponseEntity<String> updateUserStatus(@PathVariable Long userId, @RequestParam String newStatus) {
		// Find the user by ID
		Optional<User> optionalUser = userService.findById(userId);
		if (optionalUser.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		User user = optionalUser.get();
		// Update the status if the new status is valid
		if (isValidStatus(newStatus)) {
			user.setStatus(newStatus);
			userService.save(user);
			return ResponseEntity.ok("User status updated successfully.");
		} else {
			return ResponseEntity.badRequest().body("Invalid status.");
		}
	}

	private boolean isValidStatus(String status) {
		// Implement your validation logic here
		// For example, you might allow only certain status values like "approved",
		// "pending", etc.
		return status.equals("approved") || status.equals("pending");
	}

	@Operation(summary = "Get users with pending status")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found users with pending status", content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
			@ApiResponse(responseCode = "204", description = "No users with pending status found", content = @Content) })
	@GetMapping("/pending")
	public ResponseEntity<List<User>> getUsersWithPendingStatus() {
		List<User> pendingUsers = userService.findByStatus("pending");
		if (pendingUsers.isEmpty()) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(pendingUsers);
		}
	}

	@Operation(summary = "Get user by email")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found the user by email", content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
			@ApiResponse(responseCode = "404", description = "User not found by email", content = @Content) })
	@GetMapping("/email/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
		// Find the user by email
		Optional<User> optionalUser = userService.findByEmail(email);
		if (optionalUser.isEmpty()) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok(optionalUser.get());
		}
	}

	@Operation(summary = "Get all users")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Found all users", content = @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))),
			@ApiResponse(responseCode = "204", description = "No users found", content = @Content) })
	@GetMapping
	public List<User> getAllUsers() {
		return userService.findAllUsers();
	}

}
