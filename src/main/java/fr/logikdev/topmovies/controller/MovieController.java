package fr.logikdev.topmovies.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.logikdev.topmovies.api.Api;
import fr.logikdev.topmovies.model.Movie;
import fr.logikdev.topmovies.model.MovieRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/movies")
public class MovieController {

	@Autowired
	private MovieRepository repository;

	@PostMapping("/add")
	public String addMovie(@RequestBody Movie movie) {
		String message = movie.isFavorite() ? " ajouté aux favoris" : " ajouté aux films à voir";
		repository.save(movie);
		return movie.getTitle() + message;
	}

	@PutMapping("/update")
	public String updateMovie(@RequestBody Movie movie) {
		Movie oldMovie = repository.findById(movie.getId());
		String message = "";

		if(oldMovie.isFavorite() && !movie.isFavorite() || !oldMovie.isFavorite() && movie.isFavorite()) {
			message = movie.isFavorite() ? " ajouté aux favoris" : " supprimé des favoris";
		}
		else {
			message = movie.isWanted() ? " ajouté aux films à voir" : " supprimé des films à voir";
		}
		repository.save(movie);
		return movie.getTitle() + message;
	}

	@DeleteMapping("/delete")
	public String deleteMovie(@RequestBody Movie movie) {
		repository.delete(movie);
		return movie.getTitle() + " n'est plus dans aucune liste";
	}
	
	@GetMapping("/favorite/all")
	public ResponseEntity<?> getAllFavoriteMovies() {
		List<Movie> movies = repository.findByFavorite(true);
		if(movies.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vous n'avez aucun film favoris");
		}
		return ResponseEntity.status(HttpStatus.OK).body(movies);
	}

	@GetMapping("/wanted/all")
	public ResponseEntity<?> getAllWantedMovies() {
		List<Movie> movies = repository.findByWanted(true);
		if(movies.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vous n'avez aucun film à voir");
		}
		return ResponseEntity.status(HttpStatus.OK).body(movies);
	}
	
	@GetMapping("/find")
	public ResponseEntity<?> findMovieOnTMDB(@RequestParam String title, @RequestParam int page) {
		SearchMovieResponse response = Api.searchMovie(title, page);
		// Modify fields favorite and wanted
		if (response.getMovies() != null) {
			for (Movie movie : response.getMovies()) {
				Movie probableMovie = repository.findById(movie.getId());
				if (probableMovie != null) {
					movie.setFavorite(probableMovie.isFavorite());
					movie.setWanted(probableMovie.isWanted());
				}
			}
		}
		if(response.getMovies().isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Le film " + title + " n'a pas été trouvé");
		}
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/all")
	public List<Movie> getAllMovies() {
		return (List<Movie>) repository.findAll();
	}




}
