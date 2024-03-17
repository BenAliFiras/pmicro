package com.earthrealmkoders.gallery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
@EnableEurekaClient
public class GalleryApplication {

	public static void main(String[] args) {
		SpringApplication.run(GalleryApplication.class, args);
	}

}
