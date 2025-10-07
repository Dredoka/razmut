package com.soivmi.razmut.repository;

import com.soivmi.razmut.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Добавляем этот метод.
     * Spring Data JPA автоматически сгенерирует SQL-запрос для поиска пользователя по полю 'email'.
     * Optional<User> - это безопасный способ обработки случая, когда пользователь не найден.
     */
    Optional<User> findByEmail(String email);
}
