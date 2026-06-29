package com.lathika.springbootday1.repository;

import com.lathika.springbootday1.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}