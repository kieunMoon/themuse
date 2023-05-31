package theMuse.service;



import org.springframework.security.core.userdetails.UserDetailsService;

import theMuse.dto.LoginDto;
import theMuse.dto.UserDto;

public interface LoginService extends UserDetailsService {
	public UserDto login(LoginDto loginDto) throws Exception;
	public int registUser(UserDto userDto) throws Exception;
	
}
