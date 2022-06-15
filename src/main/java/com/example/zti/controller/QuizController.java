package com.example.zti.controller;


import com.example.zti.dto.quiz.QuizCreationDto;
import com.example.zti.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/{userId}/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createQuiz(@RequestBody QuizCreationDto quiz, @PathVariable ("userId") Long userId) {
        System.out.println("Get it");
        return quizService.createQuiz(quiz, userId);
    }
}
