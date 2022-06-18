package com.example.zti.controller;


import com.example.zti.dto.quiz.QuizCreationDto;
import com.example.zti.dto.quiz.QuizDto;
import com.example.zti.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;


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

    @GetMapping("/quizes")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<QuizDto> getQuizzes() {
        System.out.println("Get it");
        return quizService.getQuizzes();
    }

    @GetMapping("/{quizId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?>  getQuiz(@PathVariable("quizId") Long quizId) {
        System.out.println("Get it");
        return quizService.getQuiz(quizId);
    }

    @PostMapping("/{userId}/{quizId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?>  addQuizToHistory(@PathVariable("quizId") Long quizId, @PathVariable ("userId") Long userId) {
        return quizService.addQuizToHistory(quizId, userId);
    }

}
