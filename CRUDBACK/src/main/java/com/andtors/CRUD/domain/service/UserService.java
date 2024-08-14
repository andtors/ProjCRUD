package com.andtors.CRUD.domain.service;

import com.andtors.CRUD.domain.entity.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User getByEmail(String email);

    User save(User user);

    Optional<User> getById(String id);

    void remove(User user);

    void update(User user);

    List<User> findAllUsers();

}
