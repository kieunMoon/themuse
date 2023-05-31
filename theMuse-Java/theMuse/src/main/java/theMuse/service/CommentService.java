package theMuse.service;

import java.util.List;

import org.springframework.stereotype.Service;

import theMuse.dto.CommentDto;

@Service
public interface CommentService {
	
	// 사용자 한줄평 목록 조회
	public List<CommentDto> selectCommentList(int musicalIdx) throws Exception;

	// 사용자 한줄평 작성
	public int insertComment(CommentDto commentDto) throws Exception;
	
	// 사용자 한줄평 수정
	public int updateComment(CommentDto commentDto) throws Exception;
	
	// 사용자 한줄평 삭제
	public int deleteComment(int commentIdx) throws Exception;	
	
}
