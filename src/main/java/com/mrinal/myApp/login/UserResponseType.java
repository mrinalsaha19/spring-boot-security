package com.mrinal.myApp.login;

import org.springframework.security.web.csrf.CsrfToken;

import com.mrinal.myApp.DTO.ResponseType;

public class UserResponseType extends ResponseType{

	private String userName;
	private String email;
	private String phone;
	private String country;
	private CsrfToken csrfToken;
	public String getUserName() {
		return userName;
	}
	
	public CsrfToken getCsrfToken() {
		return csrfToken;
	}

	public void setCsrfToken(CsrfToken csrfToken) {
		this.csrfToken = csrfToken;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	
	
}
