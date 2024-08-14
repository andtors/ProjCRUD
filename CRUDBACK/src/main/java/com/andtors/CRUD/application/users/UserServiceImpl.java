package com.andtors.CRUD.application.users;

import com.andtors.CRUD.domain.entity.User;
import com.andtors.CRUD.domain.exception.DuplicatedTupleException;
import com.andtors.CRUD.domain.exception.ValidationException;
import com.andtors.CRUD.domain.service.UserService;
import com.andtors.CRUD.infra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public User save(User user) {
       var possibleUser = getByEmail(user.getEmail());
       if(possibleUser != null){
           throw new DuplicatedTupleException("User already exists.");
       }

       return userRepository.save(user);
    }

    @Override
    public Optional<User> getById(String id) {
       return userRepository.findById(id);
    }

    @Override
    public void remove(User user) {
        userRepository.delete(user);
    }

    @Override
    public void update(User user) {

        if(user.getEmail() == null || user.getEmail().trim().equals("")){
            throw new ValidationException("Email cannot be null");
        }

        if(user.getName() == null || user.getName().trim().equals("")){
            throw new ValidationException("Name cannot be null.");
        }

        if(user.getPassword() == null || user.getPassword().trim().equals("")){
            throw new ValidationException("Password cannot be null");
        }

        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

}
