package com.etsu.gobeyondclassroom.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etsu.gobeyondclassroom.model.Project;
import com.etsu.gobeyondclassroom.repositories.ProjectRepository;

@Service
public class ProjectServiceIml implements ProjectService {

	@Autowired
	private ProjectRepository projectRepository;

	@Override
	public List<Project> getAllProjects() {
		return projectRepository.findAllByOrderByIdDesc();
	}

	@Override
	public Optional<Project> getProjectById(Long id) {
		return projectRepository.findById(id);
	}

	@Override
	public Project createProject(Project project) {
		return projectRepository.save(project);
	}

	@Override
	public Project updateProject(Long id, Project project) {
		if (projectRepository.existsById(id)) {
			project.setId(id);
			return projectRepository.save(project);
		} else {
			throw new RuntimeException("Project not found with id: " + id);
		}
	}

	@Override
	public void deleteProject(Long id) {
		if (projectRepository.existsById(id)) {
			projectRepository.deleteById(id);
		} else {
			throw new RuntimeException("Project not found with id: " + id);
		}
	}

	@Override
	public List<Project> getProjectsByOwner(String ownerEmailId) {
		return projectRepository.findByOwnerOrderByIdDesc(ownerEmailId);
	}
//
//	@Override
//	public List<Project> getProjectsByParticipant(Long participantId) {
//		return projectRepository.findProjectsByParticipantId(participantId);
//	}

}
