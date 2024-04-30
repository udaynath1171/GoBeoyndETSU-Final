package com.etsu.gobeyondclassroom.service;

import java.util.List;
import java.util.Optional;

import com.etsu.gobeyondclassroom.model.Project;



public interface ProjectService {

	List<Project> getAllProjects();

	Optional<Project> getProjectById(Long id);

	Project createProject(Project project);

	Project updateProject(Long id, Project project);

	void deleteProject(Long id);

	List<Project> getProjectsByOwner(String ownerEmailId);
	
//	List<Project> getProjectsByParticipant(Long participantId);

}
