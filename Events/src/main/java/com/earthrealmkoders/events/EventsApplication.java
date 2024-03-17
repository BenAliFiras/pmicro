package com.earthrealmkoders.events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class EventsApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventsApplication.class, args);
    }

    @Autowired
    EventRepository eventRepository;

}
