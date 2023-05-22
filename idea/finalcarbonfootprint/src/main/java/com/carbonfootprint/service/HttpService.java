package com.carbonfootprint.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

public class HttpService {

	public static Map<String,String> call(String url, HttpMethod httpMethod, 
			 String requestBody)throws Exception {
		
		System.out.println("Inside call");
		Map<String,Object> params = new HashMap<>();
		String resultString = "";
		long length=0;
		Map<String,String> result=new HashMap<String,String>();
		HttpHeaders headers = new HttpHeaders();
		
//		if (queryParams!=null){
//			String[] arrOfStr = queryParams.split("&");
//	        for (String queryParam:arrOfStr) {
//				String[] arrOfStrParam = queryParam.split("=");
//	        	params.put(arrOfStrParam[0], arrOfStrParam[1]);
//	        }
//		}
		
		System.out.println("XXXX" + params.toString());
		HttpEntity<String> entity = new HttpEntity<String>(requestBody,headers);
		RestTemplate restTemplate = new RestTemplate();
		
		Date dateStart = new Date(); 
		System.out.println("Inside call1");
		ResponseEntity<String> responseEntityShouldSucceed =
		        restTemplate.exchange(url, httpMethod, entity, String.class, params);
		Date dateEnd = new Date(); 
		long difference_In_Time = dateEnd.getTime() - dateStart.getTime();
		long difference_In_Seconds = (difference_In_Time/1000)%60;
		
		final String resultTime = difference_In_Seconds>15?"red":"green";
		result.put("time",resultTime);
		if (resultTime.equals("red")){
			resultString="The performance is " + difference_In_Seconds + "sec. The speed would need to be reduced to less than 15 seconds.<BR>";
		}
		System.out.println("HEMA" + dateStart + " " + dateEnd+ " " + difference_In_Time + " "+ difference_In_Seconds);
		System.out.println("Inside call2" + responseEntityShouldSucceed.getStatusCode());
		if (responseEntityShouldSucceed.getStatusCode()==HttpStatus.OK) {
			HttpHeaders headersResponse = responseEntityShouldSucceed.getHeaders();
			if (headersResponse.getContentLength()==-1) {
				String body=responseEntityShouldSucceed.getBody();
				byte[] byteSize=body.getBytes();
				length=byteSize.length;
			}else
				length=headersResponse.getContentLength();
		}else
			throw new Exception();
		final String resultSize = length>1000000?"red":"green";
		result.put("size",resultSize);
		if (resultTime.equals("red")){
			resultString+="The size is " + length + " bytes. The size would need to be reduced to less than 1 MB.";
		}
		if(resultString.isBlank()) {
			resultString="SUCCESS";
		}
		result.put("message", resultString);
		System.out.println(result);
		return result;
	}
}

