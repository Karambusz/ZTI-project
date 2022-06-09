package com.example.zti.controller;


import com.example.zti.entity.Answer;
import com.example.zti.entity.Question;
import com.example.zti.repository.AnswerRepository;
import com.example.zti.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class TestContoller {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("/test-answer")
    public List<Answer> getAnswers() {
        return answerRepository.findAnswerByQuestionId(1L);
    }

    @GetMapping("/test-question")
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }
}
