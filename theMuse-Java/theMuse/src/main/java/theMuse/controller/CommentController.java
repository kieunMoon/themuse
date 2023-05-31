package theMuse.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import theMuse.dto.CommentDto;
import theMuse.service.CommentService;

@Slf4j
@RestController
@CrossOrigin(origins="*", allowedHeaders="*")
public class CommentController {
   
   @Autowired
   private CommentService commentService;
   
   //사용자 한줄평 조회
   @GetMapping("/themuse/musicaldetail/{musicalIdx}/getcomment")
   public ResponseEntity<List<CommentDto>> openMusicalComment(@PathVariable("musicalIdx") int musicalIdx) throws Exception {
         
      List<CommentDto> list = commentService.selectCommentList(musicalIdx);
      if(list != null && list.size() > 0) {
         return ResponseEntity.status(HttpStatus.OK).body(list);
      } else {
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
      }
   }
   
   //사용자 한줄평 작성
   @PostMapping("/themuse/musicaldetail/{musicalIdx}/insertcomment")
   public ResponseEntity<Map<String, Object>> insertComment(@PathVariable("musicalIdx") int musicalIdx, @RequestBody CommentDto commentDto) throws Exception {
      int insertedCount = 0;
      try {
         commentDto.setMusicalIdx(musicalIdx);
         
         insertedCount = commentService.insertComment(commentDto);
         if (insertedCount > 0) {
            Map<String, Object> result = new HashMap<>();
            result.put("message", "정상적으로 등록되었습니다.");
            result.put("count", insertedCount);
            result.put("commentIdx", commentDto.getCommentIdx());      
            return ResponseEntity.status(HttpStatus.OK).body(result);
         } else {
            Map<String, Object> result = new HashMap<>();
            result.put("message", "등록된 내용이 없습니다.");
            result.put("count", insertedCount);
            return ResponseEntity.status(HttpStatus.OK).body(result);
         }
      } catch (Exception e) {
         Map<String, Object> result = new HashMap<>();
         System.out.println(e);
         result.put("message", "등록 중 오류가 발생했습니다.");
         result.put("count", insertedCount);
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
      }
      
   }
   
   //사용자 한줄평 수정
   @PutMapping("/themuse/musicaldetail/{commentIdx}/updatecomment")
   public ResponseEntity<Integer> updateComment(@PathVariable("commentIdx") int commentIdx, @RequestBody CommentDto commentDto) throws Exception {
      commentDto.setCommentIdx(commentIdx);
      int updatedCount = commentService.updateComment(commentDto);
      if (updatedCount != 1) {
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(updatedCount);
      } else {
         return ResponseEntity.status(HttpStatus.OK).body(updatedCount);
      }
   }
   
   //사용자 한줄평 삭제
   @PutMapping("/themuse/musicaldetail/{commentIdx}/deletecomment")
   public ResponseEntity<Integer> deleteMusical(@PathVariable("commentIdx") int commentIdx) throws Exception {
      int deletedCount = commentService.deleteComment(commentIdx);
      if (deletedCount != 1) {
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(deletedCount);
      } else {
         return ResponseEntity.status(HttpStatus.OK).body(deletedCount);
      }
   }
   
}