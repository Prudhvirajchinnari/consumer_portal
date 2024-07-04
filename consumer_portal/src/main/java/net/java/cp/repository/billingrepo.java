package net.java.cp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.java.cp.entity.billing;

public interface billingrepo extends JpaRepository<billing, Long>{
	
}
