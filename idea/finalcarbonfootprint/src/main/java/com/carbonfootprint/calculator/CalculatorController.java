package com.carbonfootprint.calculator;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carbonfootprint.model.CarbonFootPrintList;
import com.carbonfootprint.model.CarbonFootPrintModel;
import com.carbonfootprint.service.EmailService;
import com.carbonfootprint.service.HttpService;

@CrossOrigin
@RestController
public class CalculatorController {
	
	 @Autowired
	 EmailService emailService;
	 
	 @Value("(${spring.mail.username}")
	 private String username;
	 
	 @Value("(${carbonfootprint.app.name}")
	 private String appName;
	 
	 @PostMapping(value = "/calculate", produces="application/json") 
	 public ResponseEntity<String> calculate(@RequestBody CarbonFootPrintList carbon) {
	   JSONObject result=new JSONObject();
	   List<JSONObject> parameters=new ArrayList<>();
//	   result.put("serverLocation", carbon.getServerLocation());
//	   result.put("appLocation", carbon.getAppLocation());
	   for(CarbonFootPrintModel carbonFootPrintModelEach:carbon.getRequest()){
			try {
				JSONObject parameter=new JSONObject();
				parameter.put("url", carbonFootPrintModelEach.getUrl());
				parameter.put("method", carbonFootPrintModelEach.getMethod());
				System.out.println(carbonFootPrintModelEach.getQueryParams());
				HttpMethod httpMethod=HttpMethod.valueOf(carbonFootPrintModelEach.getMethod());
				Map<String,String> resultFromHttpCall = HttpService.call(carbonFootPrintModelEach.getUrl(),httpMethod,carbonFootPrintModelEach.getQueryParams());
				if (resultFromHttpCall.get("time")=="red" || resultFromHttpCall.get("size")=="red") {
					parameter.put("output", "false");
				}else {
					parameter.put("output", "true");
				}
				parameter.put("queryParams", carbonFootPrintModelEach.getQueryParams());
				parameters.add(parameter);
				result.put("response", parameters);
			}catch (Exception e) {
				return new ResponseEntity<String>("Failure",HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		return new ResponseEntity<String>(parameters.toString(),HttpStatus.OK);
	 }
	 
	 @GetMapping(value = "/email") 
	 public String calculate(@RequestParam String email) {
		 emailService.sendEmail(username, appName, email);
		 return "Sent";
	 }
}
