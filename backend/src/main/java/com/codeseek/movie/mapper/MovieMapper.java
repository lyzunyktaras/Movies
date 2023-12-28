package com.codeseek.movie.mapper;

import com.codeseek.movie.dto.MovieDTO;
import com.codeseek.movie.entity.Movie;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MovieMapper {

    public Movie map(MovieDTO movieDTO) {
        if (movieDTO == null) {
            return null;
        }

        Movie movie = new Movie();

        movie.setId(movieDTO.getId());
        movie.setImage(movieDTO.getImage());
        movie.setTitle(movieDTO.getTitle());
        movie.setYear(movieDTO.getYear());

        return movie;
    }

    public MovieDTO map(Movie movie) {
        if (movie == null) {
            return null;
        }

        MovieDTO movieDTO = new MovieDTO();

        movieDTO.setId(movie.getId());
        movieDTO.setImage(movie.getImage());
        movieDTO.setTitle(movie.getTitle());
        if (movie.getYear() != null) {
            movieDTO.setYear(movie.getYear());
        }

        return movieDTO;
    }

    public void update(MovieDTO movieDTO, Movie movie) {
        if (movieDTO == null) {
            return;
        }

        movie.setId(movieDTO.getId());
        movie.setImage(movieDTO.getImage());
        movie.setTitle(movieDTO.getTitle());
        movie.setYear(movieDTO.getYear());
    }

    public List<MovieDTO> map(List<Movie> movies) {
        if (movies == null) {
            return null;
        }

        List<MovieDTO> list = new ArrayList<>(movies.size());
        for (Movie movie : movies) {
            list.add(map(movie));
        }

        return list;
    }
}
