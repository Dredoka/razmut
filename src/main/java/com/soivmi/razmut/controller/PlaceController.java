package com.soivmi.razmut.controller;

import com.soivmi.razmut.model.Place;
import com.soivmi.razmut.repository.PlaceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/places")
public class PlaceController {

    private final PlaceRepository placeRepository;

    public PlaceController(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    // 1️⃣ Добавление одного места
    @PostMapping
    public Place createPlace(@RequestBody Place place) {
        return placeRepository.save(place);
    }

    // 2️⃣ Добавление нескольких мест за один запрос
    @PostMapping("/batch")
    public List<Place> createPlaces(@RequestBody List<Place> places) {
        return placeRepository.saveAll(places);
    }

    // 3️⃣ Получение случайного места
    @GetMapping("/random")
    public ResponseEntity<Place> getRandomPlace() {
        Optional<Place> randomPlace = placeRepository.findRandomPlace();
        return randomPlace.map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    // Дополнительно: GET всех мест с фильтром по типу
    @GetMapping
    public List<Place> getPlaces(@RequestParam(required = false) String type) {
        if (type != null) {
            return placeRepository.findByTypeIgnoreCase(type);
        }
        return placeRepository.findAll();
    }

    @GetMapping("/random/{userId}")
    public ResponseEntity<Place> getRandomPlaceForUser(@PathVariable Long userId) {
        return placeRepository.findRandomPlaceNotChosenByUser(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }
    @GetMapping("/liked/{userId}")
    public List<Place> getLikedPlaces(@PathVariable Long userId) {
        return placeRepository.findLikedPlacesByUser(userId);
    }

    @GetMapping("/disliked/{userId}")
    public List<Place> getDislikedPlaces(@PathVariable Long userId) {
        return placeRepository.findDislikedPlacesByUser(userId);
    }

}
