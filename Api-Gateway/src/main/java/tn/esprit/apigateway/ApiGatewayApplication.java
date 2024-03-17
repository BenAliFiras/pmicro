package tn.esprit.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import tn.esprit.apigateway.Config.FilterAuthentificate;

@SpringBootApplication
@EnableEurekaClient
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }



    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder, FilterAuthentificate filterAuthentificate) {
        return builder.routes()
                .route("event-service", r -> r.path("/events/**").uri("http://localhost:8096"))
                .route("product-service", r -> r.path("/products/**").uri("http://localhost:8090"))
                .route("userms", r -> r.path("/users/**").uri("http://localhost:8050"))
                .route("articlems", r -> r.path("/article/**").uri("http://localhost:8094"))
                .route("fidleitems", r -> r.path("/fidelites/**").uri("http://localhost:8092"))
                .route("gallery-s", r -> r.path("/galleries/**").uri("http://localhost:8095"))
                .route("reclamationms", r -> r.path("/reclamations/**").uri("http://localhost:8093"))
                .route("user", r -> r.path("/user/**").uri("http://localhost:8093"))
                .route("discovery-server", r -> r.path("/eureka/web").filters(f -> f.setPath("/")).uri("http://localhost:8761"))
                .route("discovery-server-static", r -> r.path("/eureka/**").uri("http://localhost:8761"))
                 //Hedhoula mta3 nodejs
                .route("signup", r -> r.path("/signup/**").uri("http://localhost:5000"))
                .route("login", r -> r.path("/login/**").uri("http://localhost:5000"))
                .route("logout", r -> r.path("/logout/**").uri("http://localhost:5000"))
                .route("getalluser", r -> r.path("/getalluser/**").uri("http://localhost:5000"))
                .build();
    }


}
