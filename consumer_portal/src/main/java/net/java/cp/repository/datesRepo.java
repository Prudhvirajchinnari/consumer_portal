package net.java.cp.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.java.cp.entity.dates;

public interface datesRepo extends JpaRepository<dates, Long> {
    dates findByDateAndMeterId(Date date, String meterId);

	List<dates> findByMonthAndMeterId(String month, String meterId);
}

