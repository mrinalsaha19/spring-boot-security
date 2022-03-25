package com.mrinal.myApp.login;

import org.springframework.stereotype.Service;

@Service
public class LoginService {

	public UserResponseType login(UserDTO user) {
		UserResponseType response = new UserResponseType();
		if (user.getUsername() != null && !"false".equals(user.getUsername()) && user.getPassword() != null) {
			response.setUserName(user.getUsername());
			response.setCountry("India");
			response.setEmail("email@gmail.com");
			response.setPhone("9087-255162");
			response.setSuccessCode("200");
		} else if (user.getUsername() != null && "false".equals(user.getUsername()) && user.getPassword() != null) {
			{
				response.setErrorMessage("User does not have access");
				response.setErrorCode("303");
			}
		}
		return response;
	}
}
