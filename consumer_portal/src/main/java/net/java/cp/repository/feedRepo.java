package net.java.cp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.java.cp.entity.feedback;

public interface feedRepo extends JpaRepository<feedback, Long>{
	List<feedback> findByMeterId(String meterId);
}
