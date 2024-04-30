package com.etsu.gobeyondclassroom.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.etsu.gobeyondclassroom.model.Technology;
import com.etsu.gobeyondclassroom.repositories.TechnologyRepository;

@Service
public class TechnologyServiceImpl implements TechnologyService {

	private final TechnologyRepository technologyRepository;

	public TechnologyServiceImpl(TechnologyRepository technologyRepository) {
		this.technologyRepository = technologyRepository;
	}

	@Override
	public Optional<Technology> findTechnologyByName(String name) {
		return technologyRepository.findByName(name);
	}

	@Override
	public Technology createTechnology(Technology technology) {
		return technologyRepository.save(technology);
	}

	@SuppressWarnings("deprecation")
	@Override
	public Technology getTechnology(Long id) {
		return technologyRepository.getById(id);
	}

	@Override
	public List<Technology> getAllTechnologies() {
		// TODO Auto-generated method stub
		return technologyRepository.findAll();
	}

	@Override
	public List<Technology> createMultipleTechnologies(List<Technology> technologies) {
		// TODO Auto-generated method stub
		return technologyRepository.saveAll(technologies);
	}
}
