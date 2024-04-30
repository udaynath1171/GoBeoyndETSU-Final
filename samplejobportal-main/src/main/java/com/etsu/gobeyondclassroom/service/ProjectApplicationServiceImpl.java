package com.etsu.gobeyondclassroom.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.etsu.gobeyondclassroom.model.Project;
import com.etsu.gobeyondclassroom.model.ProjectApplication;
import com.etsu.gobeyondclassroom.repositories.ProjectApplicationRepository;
import com.etsu.gobeyondclassroom.repositories.ProjectRepository;

@Service
public class ProjectApplicationServiceImpl implements ProjectApplicationService {

	@Autowired
	private ProjectApplicationRepository projectApplicationRepository;
	
	@Autowired
    private ProjectRepository projectRepository;

	@Override
	public ProjectApplication createProjectApplication(ProjectApplication projectApplication) {
		return projectApplicationRepository.save(projectApplication);
	}

	@Override
	public List<ProjectApplication> getAllProjectApplications() {
		return projectApplicationRepository.findAll();
	}

	@Override
	public ProjectApplication getProjectApplicationById(Long id) {
		Optional<ProjectApplication> optionalProjectApplication = projectApplicationRepository.findById(id);
		return optionalProjectApplication.orElse(null);
	}

	@Override
	public ProjectApplication updateProjectApplication(Long id, ProjectApplication projectApplicationDetails) {
		Optional<ProjectApplication> optionalProjectApplication = projectApplicationRepository.findById(id);
		if (optionalProjectApplication.isPresent()) {
			ProjectApplication existingProjectApplication = optionalProjectApplication.get();
			existingProjectApplication.setUserId(projectApplicationDetails.getUserId());
			existingProjectApplication.setProjectId(projectApplicationDetails.getProjectId());
			existingProjectApplication.setStatus(projectApplicationDetails.getStatus());
			existingProjectApplication.setComments(projectApplicationDetails.getComments());
			return projectApplicationRepository.save(existingProjectApplication);
		} else {
			return null;
		}
	}

	@Override
	public void deleteProjectApplication(Long id) {
		projectApplicationRepository.deleteById(id);
	}

	@Override
	public ProjectApplication updateProjectApplicationStatus(Long id, String status) {
		ProjectApplication projectApplication = projectApplicationRepository.findById(id).orElse(null);
		if (projectApplication != null) {
			projectApplication.setStatus(status);
			return projectApplicationRepository.save(projectApplication);
		}
		return null;
	}

	@Override
	public List<ProjectApplication> getProjectApplicationsByProjectId(Long projectId) {
		return projectApplicationRepository.findByProjectId(projectId);
	}

	@Override
	public List<Project> getProjectsByUserIdAndStatus(Long userId, String status) {
		List<ProjectApplication> projectApplications = projectApplicationRepository.findByUserIdAndStatus(userId, status);
        List<Long> projectIds = projectApplications.stream()
                .map(ProjectApplication::getProjectId)
                .collect(Collectors.toList());
        return projectRepository.findAllByIdIn(projectIds);
	}

}
