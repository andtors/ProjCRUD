package com.andtors.CRUD.infra.repository;

import com.andtors.CRUD.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
}
