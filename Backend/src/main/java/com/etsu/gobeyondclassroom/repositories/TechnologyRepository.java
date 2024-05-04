package com.etsu.gobeyondclassroom.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.etsu.gobeyondclassroom.model.Technology;

public interface TechnologyRepository extends JpaRepository<Technology, Long> {
	Optional<Technology> findByName(String name);
}
