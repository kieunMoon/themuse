package theMuse.dto;

import lombok.Data;

@Data
public class MusicalDto {
	
	private int musicalIdx;
	private String musicalName;
	private String musicalActor;
	private int musicalRunningtime;
	private String musicalStartperiod;
	private String musicalEndperiod;
	private String musicalImg;
	private String musicalDetailImg;
	private int musicalPrice;
	private int musicalLikeCt;
	private String commentContent;
	private String commentDt;
	private String musicalPickYn;
}
