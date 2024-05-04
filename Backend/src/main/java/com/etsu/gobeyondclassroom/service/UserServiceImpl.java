package com.etsu.gobeyondclassroom.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.etsu.gobeyondclassroom.model.Technology;
import com.etsu.gobeyondclassroom.model.User;
import com.etsu.gobeyondclassroom.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final TechnologyService technologyService;
	private final PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepository, TechnologyService technologyService,
			PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.technologyService = technologyService;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public User registerUser(String firstName, String lastName, String email, String password, String role,
			Set<String> technologyNames) {

		if (userRepository.findByEmail(email).isPresent()) {
			throw new RuntimeException("Email already exists: " + email);
		}

		User user = new User();
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setEmail(email);
		user.setPassword(passwordEncoder.encode(password)); // Store hashed password
		user.setRole(role);
		user.setStatus("pending");

		Set<String> technologies = new HashSet<>();

		for (String technologyName : technologyNames) {
			Optional<Technology> technologyOptional = technologyService.findTechnologyByName(technologyName);
			technologyOptional.ifPresent(technology -> technologies.add(technology.getName()));
		}
		user.setTechnologies(technologies);

		return userRepository.save(user);
	}

	@Override
	public boolean authenticateUser(String username, String email, String password) {
//		Optional<User> userOptional = userRepository.findByUsername(username);
		Optional<User> userOptional = userRepository.findByEmail(email);
		return userOptional.filter(user -> user.getStatus().equals("approved")) // Check if user status is "approved"
				.map(user -> passwordEncoder.matches(password, user.getPassword())) // Check password if status is //
																					// "approved"
				.orElse(false); // Return false if user not found or status is not "approved"
	}

	@Override
	public Optional<User> findById(Long userId) {

		return userRepository.findById(userId);
	}

	@Override
	public void save(User user) {
		userRepository.save(user);

	}

	@Override
	public List<User> findByStatus(String status) {
		return userRepository.findByStatus(status);
	}

	@Override
	public Optional<User> findByEmail(String email) {

		return userRepository.findByEmail(email);
	}

	@Override
	public List<User> findAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}
}
