// Файл: src/main/java/com/soivmi/razmut/controller/AuthController.java
package com.soivmi.razmut.controller;

import com.soivmi.razmut.model.AuthRequest;
import com.soivmi.razmut.model.User;
import com.soivmi.razmut.security.JwtTokenUtil;
import com.soivmi.razmut.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserService userService;

    /**
     * Эндпоинт для входа пользователя.
     * @param authRequest DTO с email и паролем.
     * @param response Объект ответа для установки cookie.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest authRequest, HttpServletResponse response) {
        // Стандартная аутентификация через Spring Security
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final String jwt = jwtTokenUtil.generateToken(userDetails);

        // Создаем httpOnly cookie для безопасного хранения токена
        ResponseCookie cookie = ResponseCookie.from("accessToken", jwt)
                .httpOnly(true)       // Защита от XSS: cookie недоступен из JavaScript
                .secure(false)        // В продакшене ОБЯЗАТЕЛЬНО поставить true (требует HTTPS)
                .path("/")            // Cookie будет доступен на всем сайте
                .maxAge(7 * 24 * 60 * 60) // Срок жизни cookie (например, 7 дней)
                .build();

        // Устанавливаем cookie в заголовок ответа
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        // Возвращаем основную информацию о пользователе в теле ответа
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("email", userDetails.getUsername());
        responseBody.put("roles", userDetails.getAuthorities());

        return ResponseEntity.ok(responseBody);
    }

    /**
     * Эндпоинт для регистрации нового пользователя.
     * @param authRequest DTO с email и паролем.
     */
    @PostMapping("/register")
    // @Valid включает валидацию для authRequest
    public ResponseEntity<?> register(@Valid @RequestBody AuthRequest authRequest) {
        // Делегируем всю логику в UserService
        User registeredUser = userService.registerNewUser(authRequest);

        // Можно сразу после регистрации логинить пользователя и возвращать cookie,
        // либо просто сообщение об успехе. Давайте залогиним.
        final UserDetails userDetails = userDetailsService.loadUserByUsername(registeredUser.getEmail());
        final String jwt = jwtTokenUtil.generateToken(userDetails);

        // Возвращаем токен в теле ответа, т.к. cookie мы установим при первом логине.
        // Или можно также установить cookie здесь. Для единообразия лучше просто вернуть сообщение.
        return ResponseEntity.ok("Регистрация прошла успешно. Пожалуйста, войдите.");
    }
}