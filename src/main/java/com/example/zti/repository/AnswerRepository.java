package com.example.zti.repository;

import com.example.zti.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    @Query("select a from Answer a where a.question.id = :id")
    List<Answer> findAnswerByQuestionId(@Param("id") Long id);
}
