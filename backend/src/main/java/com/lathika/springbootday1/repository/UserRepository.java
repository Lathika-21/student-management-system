package com.lathika.springbootday1.repository;

import com.lathika.springbootday1.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {

    User findByEmail(String email);

}