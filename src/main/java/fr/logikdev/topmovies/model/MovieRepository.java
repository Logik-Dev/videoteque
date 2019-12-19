package fr.logikdev.topmovies.model;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface MovieRepository extends CrudRepository<Movie, Integer> {
	
	public Movie findById(int id);
	public List<Movie> findByTitle(String title);
	public List<Movie> findByWanted(boolean isWanted);
	public List<Movie> findByFavorite(boolean isFavorite);
}
