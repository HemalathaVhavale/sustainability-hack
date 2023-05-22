package com.carbonfootprint.model;

import java.util.ArrayList;
import java.util.List;

public class CarbonFootPrintList {
	List<CarbonFootPrintModel> request = new ArrayList<>();
	String serverLocation;
	String appLocation;
	public List<CarbonFootPrintModel> getRequest() {
		return request;
	}
	public void setRequest(List<CarbonFootPrintModel> request) {
		this.request = request;
	}
	public String getServerLocation() {
		return serverLocation;
	}
	public void setServerLocation(String serverLocation) {
		this.serverLocation = serverLocation;
	}
	public String getAppLocation() {
		return appLocation;
	}
	public void setAppLocation(String appLocation) {
		this.appLocation = appLocation;
	}
	
}
