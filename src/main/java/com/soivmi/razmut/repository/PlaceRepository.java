package com.soivmi.razmut.repository;

import com.soivmi.razmut.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {

    // Фильтр по типу без учета регистра
    List<Place> findByTypeIgnoreCase(String type);

    // Выбор случайного места
    @Query(value = "SELECT * FROM place ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Optional<Place> findRandomPlace();

    @Query(value = """
        SELECT * FROM place p
        WHERE p.id NOT IN (
            SELECT c.place_id FROM choice c WHERE c.user_id = :userId
        )
        ORDER BY RANDOM() LIMIT 1
        """, nativeQuery = true)
    Optional<Place> findRandomPlaceNotChosenByUser(Long userId);

    @Query(value = """
        SELECT p.* FROM place p
        JOIN choice c ON p.id = c.place_id
        WHERE c.user_id = :userId AND c.liked = true
        """, nativeQuery = true)
    List<Place> findLikedPlacesByUser(Long userId);

    @Query(value = """
        SELECT p.* FROM place p
        JOIN choice c ON p.id = c.place_id
        WHERE c.user_id = :userId AND c.liked = false
        """, nativeQuery = true)
    List<Place> findDislikedPlacesByUser(Long userId);

}
