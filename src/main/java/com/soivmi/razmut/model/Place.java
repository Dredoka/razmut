package com.soivmi.razmut.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;     // Название места (например, "Кинотеатр Космос")
    private String type;     // Тип: ресторан, театр, кино
    private Double lat;      // Широта
    private Double lng;      // Долгота
}
