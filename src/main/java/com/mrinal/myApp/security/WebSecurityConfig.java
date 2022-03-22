package com.mrinal.myApp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
	
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	public WebSecurityConfig(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}



	@Override
	protected void configure(HttpSecurity http)  throws Exception{
		System.out.println("Inside WebSecurityConfig:configure");
		http
			//.csrf().disable()
//		.headers()
//		.contentTypeOptions()
//		.and()
//		.xssProtection()
//		.and()
//		.httpStrictTransportSecurity()
//		.and()
//		.frameOptions()
//		.and()
		//.addHeaderWriter(new StaticHeadersWriter("Content-Security-Policy",cspHeader)).and()
			.authorizeRequests()
			.antMatchers("/api/**").permitAll()
			.anyRequest()
			.authenticated()
			.and()
			.formLogin()
			//.loginProcessingUrl("/api/login")
			//.loginPage("/login").permitAll()
			.and()
			.logout()
			.permitAll()
			.logoutUrl("/api/logout");
	}
	
	/* @Autowired
	public void configureGlobal(AuthenticationManagerBuilder authenticationMgr) throws Exception {
		authenticationMgr.inMemoryAuthentication().withUser("admin").password(passwordEncoder.encode("myPassword"))
				.authorities("ADMIN").and() //
				.withUser("javainuse").password("javainuse").authorities("ROLE_USER", "ROLE_ADMIN");
	} */
}
