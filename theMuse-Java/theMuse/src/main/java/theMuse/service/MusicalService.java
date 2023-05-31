package theMuse.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import theMuse.dto.MusicalDto;

public interface MusicalService {
	// 사용자 : 뮤지컬 메인 화면- 공연 예정일 순 출력
	public List<MusicalDto> selectMusicalOpenDate() throws Exception;

	// 사용자 : 뮤지컬 메인 화면- 좋아요 랭킹 순 출력
	public List<MusicalDto> selectMusicalRanking() throws Exception;

	// 사용자 : 뮤지컬 메인 화면- MD's Pick 출력
	public List<MusicalDto> selectMusicalMdPick() throws Exception;

	// 사용자 : 뮤지컬 정보 목록 조회
	public int MusicalListCount() throws Exception;

	// 사용자 : 뮤지컬 정보 목록 조회 
	public List<MusicalDto> selectMusicalList() throws Exception;

	// 사용자 : 뮤지컬 정보 상세 조회-좋아요 수
	public MusicalDto selectLikesCount(int musicalIdx) throws Exception;

	// 사용자 : 뮤지컬 정보 목록 조회 - 좋아요 수 업데이트 기능
	public int updateLikesCount(MusicalDto musicalDto) throws Exception;
	public int deleteLikesCount(MusicalDto musicalDto) throws Exception;

	// 관리자 : 뮤지컬 정보 등록
	// 뮤지컬 포스터 이미지 저장
	public int insertMusicalInfo(MusicalDto musicalDto) throws Exception;

	// 관리자 : 뮤지컬 정보 상세 조회
	public MusicalDto selectMusicalDetail(int musicalIdx) throws Exception;

	// 관리자 : 뮤지컬 정보 수정 - 이미지 업데이트
	// 뮤지컬 상세정보 이미지 저장
	public int updateMusicalInfo(MusicalDto musicalDto) throws Exception;

	// 관리자 : 뮤지컬 정보 삭제
	public int deleteMusicalInfo(int musicalIdx) throws Exception;


}
