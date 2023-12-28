package com.codeseek.movie.service;

import com.codeseek.movie.dto.AuthUserDTO;
import com.codeseek.movie.dto.RegisterUserDTO;
import com.codeseek.movie.dto.UserDTO;
import com.codeseek.movie.security.jwt.JwtHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.InstanceAlreadyExistsException;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtHelper jwtHelper;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public String authenticateUser(AuthUserDTO authUserDTO) {
        Authentication authentication;
        try {
            authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    authUserDTO.getUsername(), authUserDTO.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (AuthenticationException authenticationException) {
            throw new BadCredentialsException("Bad credentials");
        }

        return jwtHelper.generateJwtToken(authentication);
    }

    public UserDTO registerUser(RegisterUserDTO registerUserDTO) throws InstanceAlreadyExistsException {
        if (!userService.userExists(registerUserDTO.getUsername())) {
            UserDTO userDTO = new UserDTO();
            userDTO.setUsername(registerUserDTO.getUsername());
            userDTO.setPassword(passwordEncoder.encode(registerUserDTO.getPassword()));
            return userService.createUser(userDTO);
        }
        throw new InstanceAlreadyExistsException("User already exists");
    }
}

