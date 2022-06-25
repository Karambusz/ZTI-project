package com.example.zti;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@SecurityScheme(
        name = "Bearer Authentication",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
// jwt for swagger - eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjJAZ21haWwuY29tIiwiaWF0IjoxNjU2MTk1MTg1LCJleHAiOjE2NTg3ODcxODV9.-e8QIYP_UHFToIXJUExvJwuAUsnliZLEMu9nf24FmRUfR4NliT_UkkY3sX4Vouh6KqTmqH5444bp3THlNlla1g
@OpenAPIDefinition(info = @Info(title = "Quizzes ZTI", version = "1.0", description = "Projekt dla przedmiotu ZTI"))
public class ZtiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZtiApplication.class, args);
    }

}
