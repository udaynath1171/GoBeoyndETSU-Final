package com.etsu.gobeyondclassroom.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.etsu.gobeyondclassroom.model.ProjectApplication;

@Repository
public interface ProjectApplicationRepository extends JpaRepository<ProjectApplication, Long> {

	List<ProjectApplication> findByProjectId(Long projectId);

	List<ProjectApplication> findByUserIdAndStatus(Long userId, String status);

}
