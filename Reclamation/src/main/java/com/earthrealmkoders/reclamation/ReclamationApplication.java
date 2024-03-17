package com.earthrealmkoders.reclamation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ReclamationApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReclamationApplication.class, args);
	}

}
