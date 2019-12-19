package fr.logikdev.topmovies.controller;

import java.util.List;

import fr.logikdev.topmovies.model.Movie;

public class SearchMovieResponse {
	
	private int pages;
	private List<Movie> movies;
	
	public SearchMovieResponse() {}

	public int getPages() {
		return pages;
	}
	public List<Movie> getMovies() {
		return movies;
	}

	public void setPages(int pages) {
		this.pages = pages;
	}

	public void setMovies(List<Movie> movies) {
		this.movies = movies;
	}
	
	
	
}
