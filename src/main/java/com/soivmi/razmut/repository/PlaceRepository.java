package com.soivmi.razmut.repository;

import com.soivmi.razmut.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByType(String type);
}
