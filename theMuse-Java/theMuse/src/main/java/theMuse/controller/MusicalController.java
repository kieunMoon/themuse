package theMuse.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import theMuse.dto.MusicalDto;
import theMuse.service.MusicalService;

@Slf4j
@RestController
@CrossOrigin(origins="*", allowedHeaders="*")
public class MusicalController {

	@Autowired
	private MusicalService musicalService;
		
    // 사용자 : 뮤지컬 메인 화면- 공연 예정일 순 출력
    @GetMapping("/themuse/main/open")
      public ResponseEntity<List<MusicalDto>> mainMusicalOpenDate() throws Exception {
          List<MusicalDto> openDatelist = musicalService.selectMusicalOpenDate();
          if(openDatelist != null && openDatelist.size() > 0) {
              return ResponseEntity.status(HttpStatus.OK).body(openDatelist);
          } else {
              return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
          }
      }

      // 사용자 : 뮤지컬 메인 화면- 좋아요 랭킹 순 출력
      @GetMapping("/themuse/main/rank")
      public ResponseEntity<List<MusicalDto>> mainMusicalRanking() throws Exception {
          List<MusicalDto> rankinglist = musicalService.selectMusicalRanking();
          if(rankinglist != null && rankinglist.size() > 0) {
              return ResponseEntity.status(HttpStatus.OK).body(rankinglist);
          } else {
              return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
          }
      }

      // 사용자 : 뮤지컬 메인 화면- MD's Pick 출력
      @GetMapping("/themuse/main/pick")
      public ResponseEntity<List<MusicalDto>> mainMusicalMdPick() throws Exception {
          List<MusicalDto> mdPicklist = musicalService.selectMusicalMdPick();
          if(mdPicklist != null && mdPicklist.size() > 0) {
              return ResponseEntity.status(HttpStatus.OK).body(mdPicklist);
          } else {
              return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
          }
      }
	
	//Todo 뮤지컬 정보 목록 조회 & 페이징
	@GetMapping("/themuse/musicallist")
	public ResponseEntity<List<MusicalDto>> openMusicalList() throws Exception {
		List<MusicalDto> list = musicalService.selectMusicalList();
		
		if(list != null && list.size() > 0) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}
	
	// 사용자 : 뮤지컬 정보 상세 조회
	@GetMapping("/themuse/musicaldetail/{musicalIdx}")
	public ResponseEntity<MusicalDto> openMusicalDetail(@PathVariable("musicalIdx") int musicalIdx) throws Exception {
		MusicalDto musicalDto = musicalService.selectMusicalDetail(musicalIdx);
		if (musicalDto == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(musicalDto);
		}
	}
	
	   // 사용자 : 뮤지컬 정보 상세 조회 - 좋아요
	   @GetMapping("/themuse/musicaldetail/{musicalIdx}/getlike")
	   public ResponseEntity<MusicalDto> openGetLike(@PathVariable("musicalIdx") int musicalIdx) throws Exception {
	      MusicalDto musicalDto = musicalService.selectLikesCount(musicalIdx);
	      if (musicalDto == null) {
	         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	      } else {
	         return ResponseEntity.status(HttpStatus.OK).body(musicalDto);
	      }
	   }
	   
	   
	   // 사용자 : 좋아요 수 업데이트
	   @PutMapping("/themuse/musicaldetail/{musicalIdx}/like")
	   public ResponseEntity<Integer> updateLike(@PathVariable("musicalIdx") int musicalIdx, @RequestBody MusicalDto musicalDto) throws Exception {
	      int updatedCount = musicalService.updateLikesCount(musicalDto);
	      if (updatedCount != 1) {
	         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(updatedCount);
	      } else {
	         return ResponseEntity.status(HttpStatus.OK).body(updatedCount);
	      }
	   }
	   
	   @PutMapping("/themuse/musicaldetail/{musicalIdx}/unlike")
	   public ResponseEntity<Integer> deleteLike(@PathVariable("musicalIdx") int musicalIdx, @RequestBody MusicalDto musicalDto) throws Exception {
	      int updatedCount = musicalService.deleteLikesCount(musicalDto);
	      if (updatedCount != 1) {
	         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(updatedCount);
	      } else {
	         return ResponseEntity.status(HttpStatus.OK).body(updatedCount);
	      }
	   }
	
	//관리자용 뮤지컬 정보 목록 조회 & 페이징
		@GetMapping("/themuse/admin/musicallist")
		public ResponseEntity<List<MusicalDto>> openAdminMusicalList() throws Exception {
			List<MusicalDto> list = musicalService.selectMusicalList();
			
			if(list != null && list.size() > 0) {
				return ResponseEntity.status(HttpStatus.OK).body(list);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}
		}
		
	// 관리자 : 뮤지컬 정보 등록
	@PostMapping("/themuse/admin/insertmusical")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Map<String, Object>> insertMusical(
			@RequestPart(value = "data", required = false) MusicalDto musicalDto,
			@RequestPart(value = "musicalImg", required = false) MultipartFile[] musicalImg, 
			@RequestPart(value = "musicalDetailImg", required = false) MultipartFile[] musicalDetailImg) throws Exception {
// 		String UPLOAD_PATH = "C:/Java/eclipse-workspace/theMuse/src/main/resources/static/img/";
		String UPLOAD_PATH = "C:/temp/upload/";

		try {
			for (MultipartFile mf : musicalImg) {
				String originFileName = mf.getOriginalFilename();
				try {
					File f = new File(UPLOAD_PATH + originFileName);
					mf.transferTo(f);
				} catch (IllegalStateException e) {
					e.printStackTrace();
				}
				musicalDto.setMusicalImg(originFileName);
			}
			for (MultipartFile mf : musicalDetailImg) {
				String originFileName = mf.getOriginalFilename();
				try {
					File f = new File(UPLOAD_PATH + originFileName);
					mf.transferTo(f);
				} catch (IllegalStateException e) {
					e.printStackTrace();
				}
				musicalDto.setMusicalDetailImg(originFileName);
			}

			int insertedCount = musicalService.insertMusicalInfo(musicalDto);

			if (insertedCount > 0) {
				Map<String, Object> result = new HashMap<>();
				result.put("message", "정상적으로 등록되었습니다.");
				result.put("count", insertedCount);
				result.put("musicalIdx", musicalDto.getMusicalIdx());
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
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}
	}
	
	@GetMapping("/api/getImage/{musicalImg}")
	   public void getImage(@PathVariable("musicalImg") String musicalImg, HttpServletResponse response) throws Exception {
	      // reviewImage를 읽어서 전달
	      FileInputStream fis = null;
	      BufferedInputStream bis = null;
	      BufferedOutputStream bos = null;
	      String UPLOAD_PATH = "C:/temp/upload/";
	      try {
	         response.setHeader("Content-Disposition", "inline;");
	         
	         byte[] buf = new byte[1024];
	         fis = new FileInputStream(UPLOAD_PATH + musicalImg);
	         bis = new BufferedInputStream(fis);
	         bos = new BufferedOutputStream(response.getOutputStream());
	         int read;
	         while((read = bis.read(buf, 0, 1024)) != -1) {
	            bos.write(buf, 0, read);
	         }
	      } finally {
	         bos.close();
	         bis.close();
	         fis.close();
	      }
	   }

	// 관리자 : 뮤지컬 상세정보 수정
	@PutMapping("/themuse/admin/updatedetailinfo/{musicalIdx}")
	public ResponseEntity<Map<String, Object>> updatedetailMusical(
			@RequestPart(value = "data", required = false) MusicalDto musicalDto,
			@RequestPart(value = "musicalImg", required = false) MultipartFile[] musicalImg, 
			@RequestPart(value = "musicalDetailImg", required = false) MultipartFile[] musicalDetailImg){
		String UPLOAD_PATH = "C:/temp/upload/";
		
		try {
			for (MultipartFile mf : musicalImg) {
				String savedFileName = UUID.randomUUID().toString();
				String originFileName = mf.getOriginalFilename();
				try {
					File f = new File(UPLOAD_PATH + savedFileName);
					mf.transferTo(f);
				} catch (IllegalStateException e) {
					e.printStackTrace();
				}
				musicalDto.setMusicalImg(savedFileName);
			}
			for (MultipartFile mf : musicalDetailImg) {
				String originFileName = mf.getOriginalFilename();
				String savedFileName = UUID.randomUUID().toString();
				try {
					File f = new File(UPLOAD_PATH + savedFileName);
					mf.transferTo(f);
				} catch (IllegalStateException e) {
					e.printStackTrace();
				}
				musicalDto.setMusicalDetailImg(savedFileName);
			}

			int insertedCount = musicalService.updateMusicalInfo(musicalDto);

			if (insertedCount > 0) {
				Map<String, Object> result = new HashMap<>();
				result.put("message", "정상적으로 등록되었습니다.");
				result.put("count", insertedCount);
				result.put("musicalIdx", musicalDto.getMusicalIdx());
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
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}
	}

	
	
	// 관리자 : 뮤지컬 정보 삭제
	@PutMapping("/themuse/admin/deleteinfo/{musicalIdx}")
	public ResponseEntity<Integer> deleteMusical(@PathVariable("musicalIdx") int musicalIdx) throws Exception {
		int deletedCount = musicalService.deleteMusicalInfo(musicalIdx);
		if (deletedCount != 1) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(deletedCount);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(deletedCount);
		}
	}

	
}
