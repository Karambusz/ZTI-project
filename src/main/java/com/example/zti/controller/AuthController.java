package com.example.zti.controller;

import com.example.zti.dto.user.UserLoginDto;
import com.example.zti.dto.user.UserSignUpDto;
import com.example.zti.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;



@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserLoginDto userLogin) {
        return authService.userSignIn(userLogin);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserSignUpDto signUpUser) {
        return authService.createNewUser(signUpUser);
    }

}
