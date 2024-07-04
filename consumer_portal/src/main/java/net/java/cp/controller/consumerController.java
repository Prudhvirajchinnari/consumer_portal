package net.java.cp.controller;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import net.java.cp.entity.billing;
import net.java.cp.entity.complaints;
import net.java.cp.entity.consumer;
import net.java.cp.entity.dates;
import net.java.cp.entity.feedback;
import net.java.cp.repository.billingrepo;
import net.java.cp.repository.complaintsRepo;
import net.java.cp.repository.datesRepo;
import net.java.cp.repository.feedRepo;
import net.java.cp.repository.repository;

@RestController
public class consumerController {
	
	@Autowired
	private repository repo;
	
	@Autowired
	private feedRepo ferepo;
	
	//To add a new consumer but not for logging a consumer in
//	@PostMapping("/consumers")
//	@CrossOrigin(origins = "http://127.0.0.1:5500")
//	public String save(@RequestBody consumer cons){
//		Optional<consumer> cons1 = repo.findById(cons.getConsumer_id());
//		Optional<consumer> cons2 = repo.findByUsername(cons.getUsername());
////		Map<String, String> response = new HashMap<>();
//		if (cons1.isPresent() && cons2.isPresent()) {
//		    if (cons1.get().getConsumer_id() == cons2.get().getConsumer_id()) {
//		    	System.out.println(cons.getPassword());
//		    	System.out.println(cons1.get().getPassword());
//		        if(cons.getPassword().equals(cons1.get().getPassword())) {
//		        	return "you exactly matched all the details of one of our users";
//		        }
//		        else {
//		        	return "both username and consumer id belongs to one of our users";
//		        }
//		    }else {
//		    	return "username and consumer id belongs to two of our users";
//		    }
//		}
//		if(cons1.isPresent()) {
//			return "consumer id already exists";
//		}
//		if(cons2.isPresent()) {
//			return "username already exists";
//		}
//	
//		repo.save(cons);
//		return "posted";
//	}
	
	@GetMapping("/consumers/{meterId}")
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	public consumer get(@PathVariable String meterId){
		return repo.findByMeterId(meterId).get();
	}
	
	@PostMapping("/consumers/feedback")
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	public String post(@RequestBody feedback feed) {
		ferepo.save(feed);
		return "posted";
	}

	@Autowired
	private billingrepo billingRepo;

	@GetMapping("/billing")
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	public List<billing> getAllBilling() {
	    return billingRepo.findAll();
	}
	
	@GetMapping("/consumers/feedback/{meterId}")
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	public List<feedback> getfeedbacks(@PathVariable String meterId){
		return (List<feedback>) ferepo.findByMeterId(meterId);
	}
	
	@Autowired
	private complaintsRepo crepo;
	
	@PostMapping("/complaints")
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	public complaints createComplaint(@RequestBody complaints com) {
        return crepo.save(com);
    }
	
	@GetMapping("/complaints/{id}")
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	public complaints getComplaint(@PathVariable Long id) {
		return crepo.findById(id).orElse(null);
	}
	
	@GetMapping("/complaints/meter/{meterId}")
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	public List<complaints> getComplaintMeterIds(@PathVariable String meterId) {
		return crepo.findByMeterId(meterId);
	}
	
	@Autowired
	private datesRepo depo;

	@GetMapping("/billing/dates/{date}/{meterId}")
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	public dates getConsumption(@PathVariable Date date, @PathVariable String meterId) {
	    return depo.findByDateAndMeterId(date, meterId);
	}
	
	@GetMapping("/dates/{month}/{meterId}")
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	public List<dates> getRecords(@PathVariable String month, @PathVariable String meterId) {
		return depo.findByMonthAndMeterId(month, meterId);
	}
	
	@GetMapping("/dates/all")
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	public List<dates> getAll() {
		return depo.findAll();
	}
	
	@PutMapping("/dates/month/post")
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	public String posingMonth(@RequestBody dates recordi) {
		depo.save(recordi);
		return "posted";
	}

}
