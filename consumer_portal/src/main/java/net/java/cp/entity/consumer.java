package net.java.cp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "consumer_details")
public class consumer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long consumer_id;
	private String username;
	private String password;
	private String meterId;
	public Long getConsumer_id() {
		return consumer_id;
	}
	public void setConsumer_id(Long consumer_id) {
		this.consumer_id = consumer_id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMeterId() {
		return meterId;
	}
	public void setMeterId(String meterId) {
		this.meterId = meterId;
	}
	@Override
	public String toString() {
		return "consumer [consumer_id=" + consumer_id + ", username=" + username + ", password=" + password
				+ ", meterId=" + meterId + "]";
	}
	
}