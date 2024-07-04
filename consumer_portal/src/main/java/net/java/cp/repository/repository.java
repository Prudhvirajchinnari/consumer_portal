package net.java.cp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.java.cp.entity.consumer;

public interface repository extends JpaRepository<consumer, Long>{
	Optional<consumer> findByUsername(String username);

	Optional<consumer> findByMeterId(String meterId);
}