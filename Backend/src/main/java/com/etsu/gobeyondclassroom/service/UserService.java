package com.etsu.gobeyondclassroom.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.etsu.gobeyondclassroom.model.User;

public interface UserService {
	User registerUser(String firstName, String lastName, String email, String password, String role,
			Set<String> technologyNames);

	boolean authenticateUser(String username, String email, String password);

	Optional<User> findById(Long userId);

	void save(User user);

	List<User> findByStatus(String string);

	Optional<User> findByEmail(String email);

	List<User> findAllUsers();
}
