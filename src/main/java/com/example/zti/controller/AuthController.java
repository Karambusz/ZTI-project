package com.example.zti.controller;

import com.example.zti.dto.response.JwtDto;
import com.example.zti.dto.response.MessageDto;
import com.example.zti.dto.user.UserLoginDto;
import com.example.zti.dto.user.UserSignUpDto;
import com.example.zti.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@Tag(name = "Auth API", description = "Zestaw metod zarządzania uwierzytelnianiem")
@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Operation(summary = "Obsługa logowania użytkownika, generacja JWT", security = @SecurityRequirement(name = "Bearer Authentication"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Zwraca JWT dla użytkownika", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = JwtDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Błąd walidacji", content = @Content)})
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserLoginDto userLogin) {
        return authService.userSignIn(userLogin);
    }
    @Operation(summary = "Obsługa rejestracji użytkownika", security = @SecurityRequirement(name = "Bearer Authentication"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Użytkownik został stworzony", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Błąd walidacji", content = @Content)})
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserSignUpDto signUpUser) {
        return authService.createNewUser(signUpUser);
    }

}
