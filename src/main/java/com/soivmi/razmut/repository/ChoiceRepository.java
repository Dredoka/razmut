package com.soivmi.razmut.repository;

import com.soivmi.razmut.model.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChoiceRepository extends JpaRepository<Choice, Long> {

    List<Choice> findByUserId(Long userId);

    List<Choice> findByUserIdAndLiked(Long userId, boolean liked);
}
