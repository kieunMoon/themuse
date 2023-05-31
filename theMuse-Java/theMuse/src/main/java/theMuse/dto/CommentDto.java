package theMuse.dto;

import lombok.Data;

@Data
public class CommentDto {
   private int commentIdx;
   private String commentContent;
   private String commentDt;
   private String userNickname;
   private int musicalIdx;
   
}