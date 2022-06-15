package com.example.zti.dto.quiz;

import com.example.zti.dto.question.QuestionDto;

import java.util.List;

public class QuizCreationDto {
    private String quizName;
    private String categoryName;
    private List<QuestionDto> questions;

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
