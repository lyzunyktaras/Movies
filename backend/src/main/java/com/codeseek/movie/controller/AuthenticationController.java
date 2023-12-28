package com.codeseek.movie.controller;

import com.codeseek.movie.dto.AuthUserDTO;
import com.codeseek.movie.dto.RegisterUserDTO;
import com.codeseek.movie.dto.ResponseDTO;
import com.codeseek.movie.dto.UserDTO;
import com.codeseek.movie.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.management.InstanceAlreadyExistsException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseDTO<String> authenticateUser(@Valid @RequestBody AuthUserDTO authUserDTO) {
        return new ResponseDTO<>(authenticationService.authenticateUser(authUserDTO));
    }

    @PostMapping("/register")
    public ResponseDTO<UserDTO> registerUser(@Valid @RequestBody RegisterUserDTO registerUserDTO) throws InstanceAlreadyExistsException {
        return new ResponseDTO<>(authenticationService.registerUser(registerUserDTO));
    }
}
