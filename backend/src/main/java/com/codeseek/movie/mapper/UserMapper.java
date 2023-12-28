package com.codeseek.movie.mapper;


import com.codeseek.movie.dto.UserDTO;
import com.codeseek.movie.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserMapper {
    public User map(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }

        User user = new User();

        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());

        return user;
    }

    public UserDTO map(User user) {
        if (user == null) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setPassword(user.getPassword());

        return userDTO;
    }

    public void update(UserDTO userDTO, User user) {
        if (userDTO == null) {
            return;
        }

        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());

    }

    public List<UserDTO> map(List<User> users) {
        if (users == null) {
            return null;
        }

        List<UserDTO> list = new ArrayList<>(users.size());
        for (User user : users) {
            list.add(map(user));
        }

        return list;
    }
}
