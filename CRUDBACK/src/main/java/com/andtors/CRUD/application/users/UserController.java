package com.andtors.CRUD.application.users;

import com.andtors.CRUD.domain.entity.User;
import com.andtors.CRUD.domain.exception.DuplicatedTupleException;
import com.andtors.CRUD.domain.exception.ValidationException;
import com.andtors.CRUD.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping
    public ResponseEntity save(@RequestBody UserDTO dto){
        try {
            User user = userMapper.mapToUser(dto);
            userService.save(user);

            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DuplicatedTupleException e){
            Map<String, String> jsonResult = Map.of("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(jsonResult);
        }
    }

    @GetMapping
    public ResponseEntity getAllUsers(){
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("{id}")
    public ResponseEntity getUserById(@PathVariable("id") String id){
        return userService.getById(id)
                .map( user -> new ResponseEntity(user, HttpStatus.OK))
                .orElseGet( () -> new ResponseEntity("Usuario não encontrado.", HttpStatus.NOT_FOUND));

        /*
        try {
            var user = userService.getById(id);

            return new ResponseEntity(user, HttpStatus.OK);

        } catch (DuplicatedTupleException e){
            Map<String, String> jsonResult = Map.of("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuario não encontrado.");
        }
        */

    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteUser(@PathVariable("id") String id){
        return userService.getById(id).map(user -> {
            userService.remove(user);
            return new ResponseEntity("User removed.", HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity("User not found.", HttpStatus.BAD_REQUEST));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity updateUser(@PathVariable("id") String id, @RequestBody UserDTO dto){

        return userService.getById(id)
                .map( entity -> {
                    try {
                       User user = convert(dto);
                       user.setId(entity.getId());
                       userService.update(user);
                       return ResponseEntity.ok(user);
                    } catch (ValidationException e) {
                        return ResponseEntity.badRequest().body(e.getMessage());
                    }
                }).orElseGet( () -> new ResponseEntity("User not found.",HttpStatus.NOT_FOUND));
    }

    private UserDTO convert(User user){
        return UserDTO
                .builder()
                .email(user.getEmail())
                .name(user.getName())
                .password(user.getPassword())
                .build();
    }

    private User convert (UserDTO dto){
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setName(dto.getName());
        user.setPassword(dto.getPassword());

        return user;
    }
}
