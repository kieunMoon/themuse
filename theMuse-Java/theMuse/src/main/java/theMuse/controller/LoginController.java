package theMuse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import theMuse.dto.UserDto;
import theMuse.service.LoginService;

@RestController
public class LoginController {
	
	
	@Autowired
	private LoginService loginService; 	
//	@PostMapping("/login")
//	public ResponseEntity<Object> login(LoginDto loginDto) throws Exception {
//		UserDto userDto = loginService.login(loginDto);
//		if (userDto == null) {
//			userDto.setUserPassword("");
//			return ResponseEntity.status(HttpStatus.OK).body(userDto);
//		} else {
//			return ResponseEntity.status(HttpStatus.OK).body(null);
//		}
//	}
	
	@PostMapping("/regist")
	public ResponseEntity<Object> regist(@RequestBody UserDto userDto) throws Exception {
		int registedCount = loginService.registUser(userDto);
		if (registedCount > 0) {
			return ResponseEntity.status(HttpStatus.CREATED).body(registedCount);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(registedCount);
		}
	}
}