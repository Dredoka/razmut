package com.soivmi.razmut.service;

import com.soivmi.razmut.model.User;
import com.soivmi.razmut.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository repo, BCryptPasswordEncoder encoder) {
        this.userRepository = repo;
        this.passwordEncoder = encoder;
    }

    public User register(String username, String password) throws Exception {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new Exception("Пользователь с таким именем уже существует");
        }
        String encoded = passwordEncoder.encode(password);
        User u = new User(username, encoded);
        return userRepository.save(u);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
