package com.example.zti.dto.question;

import com.example.zti.dto.answer.AnswerDto;

import java.util.List;

public class QuestionDto {
    private Long id;
    private String question;
    private List<AnswerDto> answers;

    public QuestionDto() {
    }

    public QuestionDto(Long id, String question, List<AnswerDto> answers) {
        this.id = id;
        this.question = question;
        this.answers = answers;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<AnswerDto> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerDto> answers) {
        this.answers = answers;
    }
}
