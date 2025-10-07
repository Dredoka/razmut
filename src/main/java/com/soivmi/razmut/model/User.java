package com.soivmi.razmut.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    /**
     * Поле для хранения ролей пользователя.
     * @ElementCollection используется для коллекций простых типов или Embeddable-классов.
     * FetchType.EAGER означает, что роли будут загружаться сразу вместе с пользователем.
     * @Enumerated(EnumType.STRING) указывает, что в базе данных enum будет храниться как строка (например, "USER").
     */
    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();
}