package com.codeseek.movie.service;

import com.codeseek.movie.dto.MovieDTO;
import com.codeseek.movie.entity.Movie;
import com.codeseek.movie.mapper.MovieMapper;
import com.codeseek.movie.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;

    public List<MovieDTO> getAllMovies() {
        return movieMapper.map(movieRepository.findAll());
    }

    public MovieDTO getMovie(Long id) {
        return movieMapper.map(movieRepository.findById(id).orElseThrow());
    }

    public MovieDTO createMovie(MovieDTO movieDTO) {
        Movie movie = movieRepository.save(movieMapper.map(movieDTO));
        return movieMapper.map(movie);
    }

    public MovieDTO updateMovie(Long id, MovieDTO movieDTO) {
        Movie movie = movieRepository.findById(id).orElseThrow();
        movieMapper.update(movieDTO, movie);
        return movieMapper.map(movieRepository.save(movieMapper.map(movieDTO)));
    }

    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
}
