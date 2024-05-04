package com.etsu.gobeyondclassroom.service;

import java.util.List;

import com.etsu.gobeyondclassroom.model.Project;
import com.etsu.gobeyondclassroom.model.ProjectApplication;

public interface ProjectApplicationService {

	ProjectApplication createProjectApplication(ProjectApplication projectApplication);

	List<ProjectApplication> getAllProjectApplications();

	ProjectApplication getProjectApplicationById(Long id);

	ProjectApplication updateProjectApplication(Long id, ProjectApplication projectApplicationDetails);

	void deleteProjectApplication(Long id);

	ProjectApplication updateProjectApplicationStatus(Long id, String status);

	List<ProjectApplication> getProjectApplicationsByProjectId(Long projectId);

	List<Project> getProjectsByUserIdAndStatus(Long userId, String string);

}
