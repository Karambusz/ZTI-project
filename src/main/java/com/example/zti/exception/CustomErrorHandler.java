package com.example.zti.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@ControllerAdvice
public class CustomErrorHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    private ResponseEntity<Map<String, Object>> handleConstraintViolationException(ConstraintViolationException constraintViolationException) {
        Set<ConstraintViolation<?>> violations = constraintViolationException.getConstraintViolations();
        Map<String, Object> response = new HashMap<>();
        if (!violations.isEmpty()) {
            violations.forEach(constraintViolation -> {
                response.put("message", constraintViolation.getMessage());
            });
        }
        response.put("status",  HttpStatus.BAD_REQUEST.value());
        return ResponseEntity.badRequest().body(response);
    }
}