package net.java.cp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.java.cp.entity.complaints;

public interface complaintsRepo extends JpaRepository<complaints, Long>{
	List<complaints> findByMeterId(String meterId);
}
