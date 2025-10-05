package com.soivmi.razmut.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Choice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // пока без таблицы User, просто ID

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = false)
    private Place place;

    private boolean liked; // true = лайк, false = дизлайк
}