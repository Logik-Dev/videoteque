package fr.logikdev.topmovies.api;

import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import fr.logikdev.topmovies.controller.SearchMovieResponse;
import fr.logikdev.topmovies.model.Movie;

public class Api {

	private static final String API_URL = "https://api.themoviedb.org/3/search/movie?api_key=34b428b971db84a0572fe2bd92305ac8&language=fr-FR&include_adult=false&query=";
	private static final String IMG_URL = "https://image.tmdb.org/t/p/original";
	
	/**
	 * Recherche un film sur l'api TMDB
	 * 
	 * @param title Le titre du film recherché
	 * @param page  Le numéro de la page de résultat
	 * @return Une objet SearchMovieResponse contenant une liste de film et le total des pages de résultat
	 */
	public static SearchMovieResponse searchMovie(String title, int page) {
		JSONArray movies = null;
		SearchMovieResponse response = new SearchMovieResponse();
		try {
			URL url = new URL(API_URL + title.replaceAll(" ", "%20") + "&page=" + page);
			String responseText = IOUtils.toString(url, StandardCharsets.UTF_8);
			JSONObject jsonResponse = new JSONObject(responseText);
			response.setPages(jsonResponse.getInt("total_pages"));
			movies = jsonResponse.getJSONArray("results");
			if(movies != null)
				response.setMovies(extractMoviesFromJson(movies));

		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

	/**
	 * Extrait les objets Movie d'un JSONArray
	 * 
	 * @param jsonArray Le tableau json à traiter
	 * @return Une liste d'objet Movie
	 */
	private static List<Movie> extractMoviesFromJson(JSONArray jsonArray) {
		List<Movie> movies = new ArrayList<>();
		
		for (Object movieObject : jsonArray) {
			JSONObject movieJSON = (JSONObject) movieObject;

			int id = movieJSON.getInt("id");
			String title = movieJSON.getString("title");
			String overview = movieJSON.getString("overview");
			String stringUrl = String.valueOf(movieJSON.get("poster_path"));
			String imageUrl = stringUrl.isEmpty()  || stringUrl.equals("null") ? "" : IMG_URL + String.valueOf(movieJSON.get("poster_path"));

			double note = movieJSON.getDouble("vote_average");
	
			if(!imageUrl.equals("")) {
				Movie movie = new Movie(id, title, overview, imageUrl, note, false, false);
				movies.add(movie);
			}
		}
		return movies;
	}
}
