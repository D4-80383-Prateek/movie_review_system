package com.moview_review.services;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.moview_review.documents.Movie;
import com.moview_review.repositories.MovieRepository;

@Service
public class MovieService {
	
	@Autowired
	private MovieRepository movieRepo;
	
	public List<Movie> allMovies(){
		return movieRepo.findAll();
	}

	public Optional<Movie> singleMovie(ObjectId id) {
		return movieRepo.findById(id);
	}
	
	public Optional<Movie> singleMovie(String imdbId){
		return movieRepo.findMovieByImdbId(imdbId);
	}
}
