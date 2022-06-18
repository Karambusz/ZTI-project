package com.example.zti.dto.response;

import com.example.zti.entity.Quiz;

import java.util.List;

public class JwtDto {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private List<Quiz> quizez;

    public JwtDto(Long id, String accessToken, String username, String email, List<String> roles, List<Quiz> quizez) {
        this.id = id;
        this.token = accessToken;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.quizez = quizez;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public List<Quiz> getQuizez() {
        return quizez;
    }

    public void setQuizez(List<Quiz> quizez) {
        this.quizez = quizez;
    }
}
