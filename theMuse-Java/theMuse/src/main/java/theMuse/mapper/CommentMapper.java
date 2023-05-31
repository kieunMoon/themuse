package theMuse.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import theMuse.dto.CommentDto;

@Mapper
public interface CommentMapper {
	// 사용자 한줄평 목록 조회
	public List<CommentDto> selectCommentList(int musicalIdx) throws Exception;

	// 사용자 한줄평 작성
	public int insertComment(CommentDto commentDto) throws Exception;
	
	// 사용자 한줄평 수정
	public int updateComment(CommentDto commentDto) throws Exception;
	
	// 사용자 한줄평 삭제
	public int deleteComment(int commentIdx) throws Exception;	
	
	// 별점 등록 기능
//	public void updateStarCount(int commentIdx) throws Exception;
}
