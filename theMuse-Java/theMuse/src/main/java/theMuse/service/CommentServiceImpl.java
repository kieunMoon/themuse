package theMuse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import theMuse.dto.CommentDto;
import theMuse.mapper.CommentMapper;

@Slf4j
@Service
public class CommentServiceImpl implements CommentService {

   @Autowired
   private CommentMapper commentMapper;

   //    사용자 한줄평 목록 조회
   @Override
   public List<CommentDto> selectCommentList(int musicalIdx) throws Exception {
      return commentMapper.selectCommentList(musicalIdx);
   }
    
   // 사용자 한줄평 작성
   @Override
   public int insertComment(CommentDto commentDto) throws Exception {
      return commentMapper.insertComment(commentDto);
      
   }
   // 사용자 한줄평 수정
   @Override
   public int updateComment(CommentDto commentDto) throws Exception {
      return commentMapper.updateComment(commentDto);
      
   }
   // 사용자 한줄평 삭제
   @Override
   public int deleteComment(int commentIdx) throws Exception {
      return commentMapper.deleteComment(commentIdx);
      
   }
   
}

























