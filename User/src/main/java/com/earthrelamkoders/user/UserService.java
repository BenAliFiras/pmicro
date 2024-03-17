package com.earthrelamkoders.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Integer id, User user) {
        // Check if the user exists
        if (userRepository.existsById(id)) {
            // Set the ID for the updated user
            user.setId(id);
            return userRepository.save(user);
        } else {
            return null; // User not found
        }
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}