package com.etsu.gobeyondclassroom.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.etsu.gobeyondclassroom.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

	List<Project> findAllByOrderByIdDesc();

	List<Project> findAllByIdIn(List<Long> projectIds);

	List<Project> findByOwnerOrderByIdDesc(String owner);

//	@Query("SELECT p.project FROM ProjectParticipant p WHERE p.user.id = :participantId")
//	List<Project> findProjectsByParticipantId(Long participantId);

}
