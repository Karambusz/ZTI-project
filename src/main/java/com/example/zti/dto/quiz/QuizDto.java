package com.example.zti.dto.quiz;

import com.example.zti.dto.question.QuestionDto;

import java.util.List;

public class QuizDto {
    private Long id;
    private String quizName;
    private String categoryName;
    private List<QuestionDto> questions;

    public QuizDto() {
    }

    public QuizDto(Long id, String quizName, String categoryName, List<QuestionDto> questions) {
        this.id = id;
        this.quizName = quizName;
        this.categoryName = categoryName;
        this.questions = questions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuizName() {
        return quizName;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<QuestionDto> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionDto> questions) {
        this.questions = questions;
    }
}
