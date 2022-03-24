package com.mrinal.myApp.login;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" })
@RestController
public class LoginController {

	@Autowired
	public LoginService loginService;
	
	public LoginService getLoginService() {
		return loginService;
	}

	public void setLoginService(LoginService loginService) {
		this.loginService = loginService;
	}

	@PostMapping(path="/api/login", produces= MediaType.APPLICATION_JSON_VALUE)
	public UserResponseType login(@RequestBody UserDTO user) {
		Authentication  a = SecurityContextHolder.getContext().getAuthentication();
		return loginService.login(user);
	}
	@PostMapping(path="/api/logout", produces= MediaType.APPLICATION_JSON_VALUE)
	public UserResponseType login1() {
		UserResponseType user = new UserResponseType();
		user.setCountry("test");
		return user;
	}
	
	@GetMapping(path="/api/user", produces= MediaType.APPLICATION_JSON_VALUE)
	public UserResponseType getuser(HttpServletRequest request) {
		Authentication  a = SecurityContextHolder.getContext().getAuthentication();
		UserResponseType user = new UserResponseType();
		CsrfToken token = (CsrfToken) request.getAttribute("_csrf");
		user.setCsrfToken(token);
		return user;
	}
}
