package com.codeseek.movie.configuration;

import com.codeseek.movie.dto.ErrorResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import javax.management.InstanceAlreadyExistsException;
import java.time.ZonedDateTime;

@ControllerAdvice
@Slf4j
public class ExceptionController {
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponseDTO> handleDataIntegrityViolationException(
            DataIntegrityViolationException dataIntegrityViolationException,
            ServletWebRequest servletWebRequest) {

        ErrorResponseDTO errorResponseDTO =
                new ErrorResponseDTO(
                        ZonedDateTime.now(),
                        HttpStatus.UNPROCESSABLE_ENTITY.getReasonPhrase(),
                        HttpStatus.UNPROCESSABLE_ENTITY.value(),
                        dataIntegrityViolationException.getRootCause() != null
                                ? dataIntegrityViolationException.getRootCause().getMessage()
                                : dataIntegrityViolationException.getMessage(),
                        servletWebRequest.getRequest().getRequestURI());
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleMethodArgumentNotValid(
            MethodArgumentNotValidException methodArgumentNotValidException,
            ServletWebRequest servletWebRequest) {

        BindingResult bindingResult = methodArgumentNotValidException.getBindingResult();
        String errorMessages = bindingResult.getAllErrors().toString();

        ErrorResponseDTO errorResponseDTO =
                new ErrorResponseDTO(
                        ZonedDateTime.now(),
                        HttpStatus.UNPROCESSABLE_ENTITY.getReasonPhrase(),
                        HttpStatus.UNPROCESSABLE_ENTITY.value(),
                        errorMessages,
                        servletWebRequest.getRequest().getRequestURI());

        return new ResponseEntity<>(errorResponseDTO, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponseDTO> handleAccessDeniedException(
            AccessDeniedException accessDeniedException, ServletWebRequest servletWebRequest) {

        ErrorResponseDTO errorResponseDTO =
                new ErrorResponseDTO(
                        ZonedDateTime.now(),
                        HttpStatus.FORBIDDEN.getReasonPhrase(),
                        HttpStatus.FORBIDDEN.value(),
                        accessDeniedException.getMessage(),
                        servletWebRequest.getRequest().getRequestURI());

        return new ResponseEntity<>(errorResponseDTO, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponseDTO> handleAuthenticationException(AuthenticationException authenticationException,
                                                                          ServletWebRequest servletWebRequest) {
        ErrorResponseDTO errorResponseDTO =
                new ErrorResponseDTO(
                        ZonedDateTime.now(),
                        HttpStatus.UNAUTHORIZED.getReasonPhrase(),
                        HttpStatus.UNAUTHORIZED.value(),
                        authenticationException.getMessage(),
                        servletWebRequest.getRequest().getRequestURI());
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InstanceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDTO> handleInstanceAlreadyExistsException(InstanceAlreadyExistsException instanceAlreadyExistsException,
                                                                                 ServletWebRequest servletWebRequest) {
        ErrorResponseDTO errorResponseDTO =
                new ErrorResponseDTO(
                        ZonedDateTime.now(),
                        HttpStatus.CONFLICT.getReasonPhrase(),
                        HttpStatus.CONFLICT.value(),
                        instanceAlreadyExistsException.getMessage(),
                        servletWebRequest.getRequest().getRequestURI());
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.CONFLICT);
    }


    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleNoResourceFoundException(NoResourceFoundException noResourceFoundException,
                                                                           ServletWebRequest servletWebRequest) {
        ErrorResponseDTO errorResponseDTO =
                new ErrorResponseDTO(
                        ZonedDateTime.now(),
                        HttpStatus.NOT_FOUND.getReasonPhrase(),
                        HttpStatus.NOT_FOUND.value(),
                        noResourceFoundException.getMessage(),
                        servletWebRequest.getRequest().getRequestURI());
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(HttpMessageConversionException.class)
    public ResponseEntity<ErrorResponseDTO> handleHttpMessageConversionException(HttpMessageConversionException httpMessageConversionException,
                                                                                 ServletWebRequest servletWebRequest) {
        ErrorResponseDTO errorResponseDTO =
                new ErrorResponseDTO(
                        ZonedDateTime.now(),
                        HttpStatus.BAD_REQUEST.getReasonPhrase(),
                        HttpStatus.BAD_REQUEST.value(),
                        httpMessageConversionException.getMessage(),
                        servletWebRequest.getRequest().getRequestURI());
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleException(
            Exception exception, ServletWebRequest servletWebRequest) {
        ErrorResponseDTO errorResponseDTO =
                new ErrorResponseDTO(
                        ZonedDateTime.now(),
                        HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        exception.getMessage(),
                        servletWebRequest.getRequest().getRequestURI());
        log.error(exception.getMessage(), exception);
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
