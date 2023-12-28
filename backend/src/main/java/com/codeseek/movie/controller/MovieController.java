package com.codeseek.movie.controller;

import com.codeseek.movie.dto.MovieDTO;
import com.codeseek.movie.dto.ResponseDTO;
import com.codeseek.movie.service.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movie")
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;

    @GetMapping
    public ResponseDTO<List<MovieDTO>> getMovies() {
        return new ResponseDTO<>(movieService.getAllMovies());
    }

    @GetMapping("/{id}")
    public ResponseDTO<MovieDTO> getMovie(@PathVariable Long id) {
        return new ResponseDTO<>(movieService.getMovie(id));
    }

    @PostMapping
    public ResponseDTO<MovieDTO> createMovie(@Valid @RequestBody MovieDTO movieDTO) {
        return new ResponseDTO<>(movieService.createMovie(movieDTO));
    }

    @PutMapping("/{id}")
    public ResponseDTO<MovieDTO> updateMovie(@PathVariable Long id, @Valid @RequestBody MovieDTO movieDTO) {
        return new ResponseDTO<>(movieService.updateMovie(id, movieDTO));
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
    }
}
