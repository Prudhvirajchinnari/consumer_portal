package net.java.cp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class feedback {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long feedId;
	private String overallSatisfaction;
	private String easeOfUse;
	private String accuracy;
	private String customerService;
	private String meterId;
	public Long getFeedId() {
		return feedId;
	}
	public void setFeedId(Long feedId) {
		this.feedId = feedId;
	}
	public String getOverallSatisfaction() {
		return overallSatisfaction;
	}
	public void setOverallSatisfaction(String overallSatisfaction) {
		this.overallSatisfaction = overallSatisfaction;
	}
	public String getEaseOfUse() {
		return easeOfUse;
	}
	public void setEaseOfUse(String easeOfUse) {
		this.easeOfUse = easeOfUse;
	}
	public String getAccuracy() {
		return accuracy;
	}
	public void setAccuracy(String accuracy) {
		this.accuracy = accuracy;
	}
	public String getCustomerService() {
		return customerService;
	}
	public void setCustomerService(String customerService) {
		this.customerService = customerService;
	}
	public String getMeterId() {
		return meterId;
	}
	public void setMeterId(String meterId) {
		this.meterId = meterId;
	}
	@Override
	public String toString() {
		return "feedback [feedId=" + feedId + ", overallSatisfaction=" + overallSatisfaction + ", easeOfUse="
				+ easeOfUse + ", accuracy=" + accuracy + ", customerService=" + customerService + ", meterId=" + meterId
				+ "]";
	}
	
	

}