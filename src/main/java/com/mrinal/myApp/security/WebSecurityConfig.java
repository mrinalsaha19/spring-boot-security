package com.mrinal.myApp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.mrinal.myApp.service.UserDetailService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	/* private final PasswordEncoder passwordEncoder; */
	
	@Autowired
	private UserDetailService userDetailService;
	
	/*
	 * @Autowired public WebSecurityConfig(PasswordEncoder passwordEncoder) {
	 * this.passwordEncoder = passwordEncoder; }
	 */
	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailService);
	}
	
	@Autowired
	private JwtRequestFilter jwtRequestFilter;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("Inside WebSecurityConfig:configure");
		http
		 .csrf().disable()
//		.headers()
//		.contentTypeOptions()
//		.and()
//		.xssProtection()
//		.and()
//		.httpStrictTransportSecurity()
//		.and()
//		.frameOptions()
//		.and()
				// .addHeaderWriter(new
				// StaticHeadersWriter("Content-Security-Policy",cspHeader)).and()
				.authorizeRequests().antMatchers("/api/authenticate", "/logon", "**/logon", "*/logon").permitAll().anyRequest().authenticated().and().
				exceptionHandling().and().sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
	}
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/**/favicon.ico","/**/manifest.json", "/**/css/**", "/**/js/**","/**/*.png");
	}
	
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

}
