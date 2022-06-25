package com.example.zti.controller;

import com.example.zti.dto.quiz.QuizCreationDto;
import com.example.zti.dto.quiz.QuizDto;
import com.example.zti.dto.response.MessageDto;
import com.example.zti.entity.Quiz;
import com.example.zti.service.QuizService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Quiz API", description = "Zestaw metod zarządzania quizami")
@CrossOrigin
@RestController
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @Operation(summary = "Metoda, która pozwala stworzyć quiz (jest dostępna tylko dla admina)", security = @SecurityRequirement(name = "Bearer Authentication"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Quiz został stworzony", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Błąd walidacji", content = @Content)})
    @PostMapping("/{userId}/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createQuiz(@RequestBody QuizCreationDto quiz, @PathVariable ("userId") Long userId) {
        return quizService.createQuiz(quiz, userId);
    }

    @Operation(summary = "Metoda, która zwraca listę dostępnych quiżow", security = @SecurityRequirement(name = "Bearer Authentication"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Zwraca listę quizów", content = { @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = QuizDto.class))) })})
    @GetMapping("/quizes")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<QuizDto> getQuizzes() {
        return quizService.getQuizzes();
    }

    @Operation(summary = "Metoda, która zwraca quiz dla rozwiązania (dla użytkownika) lub dla poglądu (dla amina)", security = @SecurityRequirement(name = "Bearer Authentication"))
    @GetMapping("/{quizId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Zwraca quiz", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = Quiz.class)) }),
            @ApiResponse(responseCode = "400", description = "Nieprawidłowy identyfikator, quiz nie istnieje", content = @Content)})
    public ResponseEntity<?>  getQuiz(@PathVariable("quizId") Long quizId) {
        return quizService.getQuiz(quizId);
    }

    @Operation(summary = "Metoda, która dodaje quiz do historii użytkownika", security = @SecurityRequirement(name = "Bearer Authentication"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Quiz został dodany do historii użytkownika", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageDto.class)) }),
            @ApiResponse(responseCode = "204", description = "Quiz już istnieje w historii użytkownika", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Błąd walidacji", content = @Content)})
    @PostMapping("/{userId}/{quizId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?>  addQuizToHistory(@PathVariable("quizId") Long quizId, @PathVariable ("userId") Long userId) {
        return quizService.addQuizToHistory(quizId, userId);
    }

}
