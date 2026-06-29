package com.lathika.springbootday1.service;

import com.lathika.springbootday1.entity.Student;
import com.lathika.springbootday1.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student updateStudent(Student student) {
        return repository.save(student);
    }
    public Student addStudent(Student student) {
        return repository.save(student);
    }
    public Student getStudentById(int id) {
        return repository.findById(id).orElse(null);
    }
    public void deleteStudent(int id) {
        repository.deleteById(id);
    }
    public Student saveStudent(Student student) {
        return repository.save(student);
    }
}