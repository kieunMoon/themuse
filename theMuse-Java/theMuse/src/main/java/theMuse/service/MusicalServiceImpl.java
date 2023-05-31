package theMuse.service;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import theMuse.dto.MusicalDto;
import theMuse.mapper.MusicalMapper;

@Slf4j
@Service
public class MusicalServiceImpl implements MusicalService {

	@Autowired
	private MusicalMapper musicalMapper;

	// 사용자 : 뮤지컬 메인 화면- 공연 예정일 순 출력
	@Override
	public List<MusicalDto> selectMusicalOpenDate() throws Exception {
		return musicalMapper.selectMusicalOpenDate();
	}

	// 사용자 : 뮤지컬 메인 화면- 좋아요 랭킹 순 출력
	@Override
	public List<MusicalDto> selectMusicalRanking() throws Exception {
		return musicalMapper.selectMusicalRanking();
	}

	// 사용자 : 뮤지컬 메인 화면- MD's Pick 출력
	@Override
	public List<MusicalDto> selectMusicalMdPick() throws Exception {
		return musicalMapper.selectMusicalMdPick();
	}
	
	// 사용자 : 뮤지컬 정보 목록 조회
	@Override
	public int MusicalListCount() throws Exception {
		return musicalMapper.MusicalListCount();
	}
	// 사용자 : 뮤지컬 정보 목록 조회
	@Override
	public List<MusicalDto> selectMusicalList() throws Exception {
		return musicalMapper.selectMusicalList();
	}

	// 사용자 : 뮤지컬 정보 상세 조회-좋아요 수
	@Override
	public MusicalDto selectLikesCount(int musicalIdx) throws Exception {
		return musicalMapper.selectLikesCount(musicalIdx);
	}

	// 사용자 : 뮤지컬 정보 상세 조회 - 좋아요 수 업데이트 기능
	@Override
	public int updateLikesCount(MusicalDto musicalDto) throws Exception {
		return musicalMapper.updateLikesCount(musicalDto);
	}
	@Override
	public int deleteLikesCount(MusicalDto musicalDto) throws Exception {
		return musicalMapper.deleteLikesCount(musicalDto);
	}

	// 관리자 : 설정 파일에서 업로드 파일이 저장되는 경로를 가져와서 가지고 있는 변수
	@Value("${application.upload-path}")
	private String uploadPath;

	// 관리자 : 뮤지컬 정보 등록
	@Override
	public int insertMusicalInfo(MusicalDto musicalDto) throws Exception {
		// String savedFilePath = saveFile(file);
		// musicalDto.setMusicalImg(savedFilePath);

		return musicalMapper.insertMusicalInfo(musicalDto);
	}

	// 관리자 : 뮤지컬 정보 상세 조회
	@Override
	public MusicalDto selectMusicalDetail(int musicalIdx) throws Exception {
		return musicalMapper.selectMusicalDetail(musicalIdx);
	}

	// 관리자 : 뮤지컬 정보 수정
	@Override
	public int updateMusicalInfo(MusicalDto musicalDto) throws Exception {
		return musicalMapper.updateMusicalInfo(musicalDto);
	}

	// 관리자 : 뮤지컬 정보 삭제
	@Override
	public int deleteMusicalInfo(int musicalIdx) throws Exception {
		return musicalMapper.deleteMusicalInfo(musicalIdx);
	}

}
