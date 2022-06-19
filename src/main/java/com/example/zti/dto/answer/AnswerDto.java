package com.example.zti.dto.answer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class AnswerDto {
    private Long id;
    private String answer;
    private boolean isCorrect;

    public AnswerDto() {
    }

    public AnswerDto(Long id, String answer, boolean isCorrect) {
        this.id = id;
        this.answer = answer;
        this.isCorrect = isCorrect;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public boolean getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(boolean isCorrect) {
        this.isCorrect = isCorrect;
    }
}
