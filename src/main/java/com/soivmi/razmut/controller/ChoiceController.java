package com.soivmi.razmut.controller;

import com.soivmi.razmut.model.Choice;
import com.soivmi.razmut.repository.ChoiceRepository;
import com.soivmi.razmut.repository.PlaceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/choices")
public class ChoiceController {

    private final ChoiceRepository choiceRepository;
    private final PlaceRepository placeRepository;

    public ChoiceController(ChoiceRepository choiceRepository, PlaceRepository placeRepository) {
        this.choiceRepository = choiceRepository;
        this.placeRepository = placeRepository;
    }

    // 1️⃣ Сохраняем лайк/дизлайк
    @PostMapping
    public ResponseEntity<Choice> makeChoice(@RequestParam Long userId,
                                             @RequestParam Long placeId,
                                             @RequestParam boolean liked) {
        return placeRepository.findById(placeId)
                .map(place -> {
                    Choice choice = new Choice();
                    choice.setUserId(userId);
                    choice.setPlace(place);
                    choice.setLiked(liked);
                    return ResponseEntity.ok(choiceRepository.save(choice));
                })
                .orElse(ResponseEntity.badRequest().build());
    }

    // 2️⃣ Получить все выборы пользователя
    @GetMapping("/{userId}")
    public List<Choice> getUserChoices(@PathVariable Long userId) {
        return choiceRepository.findByUserId(userId);
    }

    // 3️⃣ Получить только лайки пользователя
    @GetMapping("/{userId}/likes")
    public List<Choice> getUserLikes(@PathVariable Long userId) {
        return choiceRepository.findByUserIdAndLiked(userId, true);
    }

    // 4️⃣ Получить только дизлайки пользователя
    @GetMapping("/{userId}/dislikes")
    public List<Choice> getUserDislikes(@PathVariable Long userId) {
        return choiceRepository.findByUserIdAndLiked(userId, false);
    }

}
