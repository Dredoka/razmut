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
}
