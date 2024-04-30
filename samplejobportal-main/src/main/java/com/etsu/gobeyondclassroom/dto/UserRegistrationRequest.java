package com.etsu.gobeyondclassroom.dto;

import java.util.Set;

import lombok.Data;

@Data
public class UserRegistrationRequest {
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String role;
	private Set<String> technologyNames; // Technologies associated with the user

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Set<String> getTechnologyNames() {
		return technologyNames;
	}

	public void setTechnologyNames(Set<String> technologyNames) {
		this.technologyNames = technologyNames;
	}

}
