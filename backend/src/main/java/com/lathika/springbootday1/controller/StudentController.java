package com.lathika.springbootday1.controller;

import com.lathika.springbootday1.entity.Student;
import com.lathika.springbootday1.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;


@RestController
public class StudentController {

    @Autowired
    private StudentService service;

    // Get all students from MySQL
    @GetMapping("/dbstudents")
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }
    @PutMapping("/dbstudents")
    public Student updateStudent(@RequestBody Student student) {
        return service.updateStudent(student);
    }
    // Test API
    @GetMapping("/college")
    public String college() {
        return "Mailam Engineering College";
    }

    // Test POST API

    @PostMapping("/dbstudents")
    public Student addStudent(@RequestBody Student student) {
        return service.saveStudent(student);
    }

    @GetMapping("/dbstudents/{id}")
    public Student getStudentById(@PathVariable int id) {
        return service.getStudentById(id);
    }
    // Test DELETE API
    @DeleteMapping("/dbstudents/{id}")
    public String deleteStudent(@PathVariable int id) {
        service.deleteStudent(id);
        return "Student Deleted Successfully";
    }
}