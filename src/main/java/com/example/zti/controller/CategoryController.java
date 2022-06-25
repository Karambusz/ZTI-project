package com.example.zti.controller;

import com.example.zti.entity.Category;
import com.example.zti.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Category API", description = "Umożliwia pobieranie kategorii quizów")
@CrossOrigin
@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Operation(summary = "Lista dostępnych kategorii")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Zwraca listę kategorii", content = { @Content(mediaType = "application/json",
                    array = @ArraySchema(schema = @Schema(implementation = Category.class))) })})
    @GetMapping
    public List<Category> getCategories() {
        return categoryService.getAllCategories();
    }
}
