package com.lathika.springbootday1.controller;

import com.lathika.springbootday1.entity.User;
import com.lathika.springbootday1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "https://student-management-system-git-main-lathika2104-5871s-projects.vercel.app")
@RestController
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    private UserService service;
    @GetMapping("/test")
    public String test() {
        return "AUTH WORKING";
    }
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return service.register(user);

    }
    @PostMapping("/login")
    public User login(@RequestBody User user) {

        return service.login(user.getEmail(), user.getPassword());

    }

}