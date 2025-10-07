// Файл: src/main/java/com/soivmi/razmut/service/UserService.java
package com.soivmi.razmut.service;

import com.soivmi.razmut.model.AuthRequest;
import com.soivmi.razmut.model.Role;
import com.soivmi.razmut.model.User;
import com.soivmi.razmut.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Метод для регистрации нового пользователя.
     * Вся бизнес-логика регистрации теперь находится здесь.
     */
    public User registerNewUser(AuthRequest authRequest) {
        // 1. Проверяем, не занят ли уже email
        if (userRepository.findByEmail(authRequest.getEmail()).isPresent()) {
            // Если занят, выбрасываем исключение, которое будет обработано GlobalExceptionHandler
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Пользователь с таким email уже существует");
        }

        // 2. Создаем нового пользователя
        User newUser = new User();
        newUser.setEmail(authRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(authRequest.getPassword()));
        // 3. Присваиваем роль по умолчанию - USER
        newUser.setRoles(Collections.singleton(Role.USER));

        return userRepository.save(newUser);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}