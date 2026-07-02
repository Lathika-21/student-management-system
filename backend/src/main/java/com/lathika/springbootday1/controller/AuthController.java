package com.lathika.springbootday1.controller;

import com.lathika.springbootday1.entity.User;
import com.lathika.springbootday1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return service.register(user);

    }
    @PostMapping("/login")
    public User login(@RequestBody User user) {

        return service.login(user.getEmail(), user.getPassword());

    }

}