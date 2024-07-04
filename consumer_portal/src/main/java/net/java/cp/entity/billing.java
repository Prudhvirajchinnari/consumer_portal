package net.java.cp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class billing {

	@Id
	private long id;
	private String month;
	private String consumption;
	private String bill;
	private String meter_number;
	private String status;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getConsumption() {
		return consumption;
	}
	public void setConsumption(String consumption) {
		this.consumption = consumption;
	}
	public String getBill() {
		return bill;
	}
	public void setBill(String bill) {
		this.bill = bill;
	}
	public String getMeter_number() {
		return meter_number;
	}
	public void setMeter_number(String meter_number) {
		this.meter_number = meter_number;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "billing [id=" + id + ", month=" + month + ", consumption=" + consumption + ", bill=" + bill
				+ ", meter_number=" + meter_number + ", status=" + status + "]";
	}
	
}