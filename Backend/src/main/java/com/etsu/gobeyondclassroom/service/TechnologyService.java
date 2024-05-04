package com.etsu.gobeyondclassroom.service;

import java.util.List;
import java.util.Optional;

import com.etsu.gobeyondclassroom.model.Technology;

public interface TechnologyService {
	Optional<Technology> findTechnologyByName(String name);

	Technology createTechnology(Technology technology);

	Technology getTechnology(Long id);

	List<Technology> getAllTechnologies();

	List<Technology> createMultipleTechnologies(List<Technology> technologies);
}
