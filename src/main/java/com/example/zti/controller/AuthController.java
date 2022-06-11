package com.example.zti.controller;

import com.example.zti.dto.response.JwtDto;
import com.example.zti.dto.user.UserLoginDto;
import com.example.zti.dto.user.UserSignUpDto;
import com.example.zti.security.jwt.JwtUtils;
import com.example.zti.security.services.UserDetailsImpl;
import com.example.zti.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;


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
