package com.example.fidelite_ms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;


@SpringBootApplication
@EnableEurekaClient
public class FideliteMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(FideliteMsApplication.class, args);
	}

	@Autowired
	FideliteRepository fideliteRepository;
}
