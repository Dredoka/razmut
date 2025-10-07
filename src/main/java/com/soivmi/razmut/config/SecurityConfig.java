// Файл: src/main/java/com/soivmi/razmut/config/SecurityConfig.java
package com.soivmi.razmut.config;

// ... (ваши импорты)
import com.soivmi.razmut.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
// ... (другие аннотации)
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Отключаем CSRF, т.к. используем JWT
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Не создаем сессию
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/auth/**").permitAll() // Эндпоинты /auth/login и /auth/register доступны всем
                        .requestMatchers("/api/users").hasAuthority("ADMIN") // Список пользователей доступен только админу
                        // .requestMatchers("/admin/**").hasAuthority("ADMIN") // Пример для будущей админ-панели
                        .anyRequest().authenticated() // Все остальные запросы требуют аутентификации
                )
                // Добавляем наш JWT фильтр перед стандартным фильтром аутентификации
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    // ... (остальные бины: AuthenticationManager, PasswordEncoder и т.д.)
}