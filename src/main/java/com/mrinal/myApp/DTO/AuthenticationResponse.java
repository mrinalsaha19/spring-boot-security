package com.mrinal.myApp.DTO;

import java.io.Serializable;

public class AuthenticationResponse extends ResponseType implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String jwt;
	
	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	
	

  

}
