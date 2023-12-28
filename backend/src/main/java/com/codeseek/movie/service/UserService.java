package com.codeseek.movie.service;

import com.codeseek.movie.dto.UserDTO;
import com.codeseek.movie.mapper.UserMapper;
import com.codeseek.movie.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDTO createUser(UserDTO userDTO) {
        return userMapper.map(userRepository.save(userMapper.map(userDTO)));
    }

    public boolean userExists(String username) {
        return userRepository.existsByUsername(username);
    }
}
