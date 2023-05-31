package theMuse.dto;

import lombok.Data;

@Data
public class UserDto {
	private int userIdx;
	private String userId;
	private String userPassword;
	private String userNickname;
	private String userRole;
}
