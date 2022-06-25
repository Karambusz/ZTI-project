package com.example.zti.service;

import com.example.zti.dto.answer.AnswerDto;
import com.example.zti.dto.question.QuestionDto;
import com.example.zti.dto.quiz.QuizCreationDto;
import com.example.zti.dto.quiz.QuizDto;
import com.example.zti.dto.response.MessageDto;
import com.example.zti.entity.*;
import com.example.zti.repository.AnswerRepository;
import com.example.zti.repository.CategoryRepository;
import com.example.zti.repository.QuizRepository;
import com.example.zti.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class QuizService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> createQuiz(QuizCreationDto quiz, Long userId) {
        Category category = categoryRepository.findByName(quiz.getCategoryName()).orElse(new Category(quiz.getCategoryName()));
        User user = userRepository.findById(userId).orElseThrow();
        categoryRepository.save(category);

        Map<Question, List<AnswerDto>> questionAnswerMap = quiz.getQuestions()
                .stream()
                .collect(Collectors.toMap(key -> new Question(key.getQuestion(), category), QuestionDto::getAnswers));

        List<Question> questionsForQuiz = new ArrayList<>();
        for (Map.Entry<Question, List<AnswerDto>> entry : questionAnswerMap.entrySet()) {
            questionsForQuiz.add(entry.getKey());
            List<Answer> answersToAdd = entry.getValue()
                    .stream()
                    .map(dto -> new Answer(dto.getAnswer(), entry.getKey(), dto.getIsCorrect()))
                    .collect(Collectors.toList());
            answerRepository.saveAll(answersToAdd);
        }
        Quiz quizToAdd = new Quiz(quiz.getQuizName(), category, questionsForQuiz);
        user.getQuizez().add(quizToAdd);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageDto("Quiz was successfully added!", 200));
    }

    public List<QuizDto> getQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        List<QuizDto> quizResponse = quizzes.stream()
                .map(this::createQuizDto).collect(Collectors.toList());
        return quizResponse;
    }

    public ResponseEntity<?>  getQuiz(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        if (quiz == null) {
        return ResponseEntity
                    .badRequest()
                    .body(new MessageDto("Error: Quiz doest not exist!", 400));
        }
        return ResponseEntity.ok(quiz);
    }

    public ResponseEntity<?> addQuizToHistory(Long quizId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        List<Quiz> userQuizzes = user.getQuizez();
        if (userQuizzes.stream().anyMatch(userQuiz -> userQuiz.getId().equals(quizId))) {
            return ResponseEntity.ok(new MessageDto("User already finished this quiz!", 204));
        }
        userQuizzes.add(quiz);
        user.setQuizez(userQuizzes);
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }


    private QuizDto createQuizDto(Quiz quiz) {
        String quizName = quiz.getName();
        String categoryName = quiz.getCategory().getName();
        List<QuestionDto> questions = quiz.getQuestions().stream()
                .map(question -> {
                    List<AnswerDto> answers = question.getAnswers().stream()
                            .map(answer -> new AnswerDto(answer.getId(), answer.getAnswer(), answer.isCorrect()))
                            .collect(Collectors.toList());
                    return new QuestionDto(question.getId(), question.getQuestion(), answers);
                }).collect(Collectors.toList());
        return new QuizDto(quiz.getId(), quizName, categoryName, questions);
    }
}
