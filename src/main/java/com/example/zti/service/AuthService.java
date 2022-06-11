package com.example.zti.service;

import com.example.zti.dto.response.JwtDto;
import com.example.zti.dto.response.MessageDto;
import com.example.zti.dto.user.UserLoginDto;
import com.example.zti.dto.user.UserSignUpDto;
import com.example.zti.entity.ERole;
import com.example.zti.entity.Role;
import com.example.zti.entity.User;
import com.example.zti.repository.RoleRepository;
import com.example.zti.repository.UserRepository;
import com.example.zti.security.jwt.JwtUtils;
import com.example.zti.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    public ResponseEntity<?> userSignIn(UserLoginDto userLogin) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLogin.getEmail(), userLogin.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtDto(jwt,
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    public ResponseEntity<?> createNewUser(UserSignUpDto signUpUser) {

        if (userRepository.existsByEmail(signUpUser.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageDto("Error: Email is already in use!", 400));
        }

        User user = new User(signUpUser.getUsername(), signUpUser.getEmail(),  encoder.encode(signUpUser.getPassword()));
        List<String> userRoles = signUpUser.getRoles();
        List<Role> roles = new ArrayList<>();

        if (userRoles == null || userRoles.isEmpty()) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            userRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageDto("User registered successfully!", 200));
    }
}
