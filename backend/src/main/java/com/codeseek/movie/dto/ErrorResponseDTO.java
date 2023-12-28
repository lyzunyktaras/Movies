package com.codeseek.movie.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponseDTO {
    private ZonedDateTime timestamp;
    private String status;
    private int statusCode;
    private String message;
    private String path;
}
