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
// jwt for swagger - eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NTYzNTQ1NTYsImV4cCI6MTY2NDEzMDU1Nn0.l9iEMXC-1haasLPQqpYDMC5_YkKtKt8AS6MrRiy8lmQrtwXjWsXmRHUcEL_3P1-xJEVHPY1rxDDh-X9NoeuEIA
@OpenAPIDefinition(info = @Info(title = "Quizzes ZTI", version = "1.0", description = "Projekt dla przedmiotu ZTI"))
public class ZtiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZtiApplication.class, args);
    }

}
