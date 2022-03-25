package com.mrinal.myApp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mrinal.myApp.DTO.AuthenticationRequest;
import com.mrinal.myApp.DTO.AuthenticationResponse;
import com.mrinal.myApp.service.UserDetailService;
import com.mrinal.myApp.util.JwtUtil;

@RestController
public class SecurityController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private UserDetailService userDetailsService;
	
	@PostMapping(path = "/api/authenticate", produces= MediaType.APPLICATION_JSON_VALUE)
	public AuthenticationResponse AuthenticationResponse (@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

		AuthenticationResponse token = new AuthenticationResponse();

		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
			);
		}
		catch (BadCredentialsException e) {
			//throw new Exception("Incorrect username or password", e);
			token.setErrorCode("404");
		}


		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String jwt = jwtTokenUtil.generateToken(userDetails);
		token.setJwt("Bearer "+jwt);
		token.setSuccessCode("200");

		return token;
	}
}
