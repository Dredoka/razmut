package com.soivmi.razmut.controller;

import com.soivmi.razmut.model.Place;
import com.soivmi.razmut.repository.PlaceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/places")
public class PlaceController {

    private final PlaceRepository placeRepository;

    public PlaceController(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    // POST /places
    @PostMapping
    public Place createPlace(@RequestBody Place place) {
        return placeRepository.save(place);
    }

    // GET /places
    @GetMapping
    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    // GET /places/{id}
    @GetMapping("/{id}")
    public Place getPlaceById(@PathVariable Long id) {
        return placeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Place not found with id " + id));
    }

    // GET /places?type=
    @GetMapping(params = "type")
    public List<Place> getPlacesByType(@RequestParam String type) {
        return placeRepository.findByType(type);
    }

    // DELETE /places/{id}
    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable Long id) {
        if (!placeRepository.existsById(id)) {
            throw new IllegalArgumentException("Place not found with id " + id);
        }
        placeRepository.deleteById(id);
    }

    // PUT /places/{id}
    @PutMapping("/{id}")
    public Place updatePlace(@PathVariable Long id, @RequestBody Place updatedPlace) {
        return placeRepository.findById(id)
                .map(place -> {
                    place.setName(updatedPlace.getName());
                    place.setType(updatedPlace.getType());
                    place.setLat(updatedPlace.getLat());
                    place.setLng(updatedPlace.getLng());
                    return placeRepository.save(place);
                })
                .orElseThrow(() -> new IllegalArgumentException("Place not found with id " + id));
    }
}
