package fr.logikdev.topmovies.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Movie {
	
	@Id
	private int id;
	
	private String title;
	
	@Column(columnDefinition = "text")
	private String overview;
	
	private String imageUrl;
	private double note;
	private boolean wanted;
	private boolean favorite;
	
	protected Movie() {}
	
	public Movie(int id, String title, String overview, String imageUrl, double note,  boolean wanted, boolean favorite) {
		this.id = id;
		this.title = title;
		this.overview = overview;
		this.imageUrl = imageUrl;
		this.note = note;
		this.wanted = wanted;
		this.favorite = favorite;
	}

	public int getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getOverview() {
		return overview;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public double getNote() {
		return note;
	}
	
	public boolean isWanted() {
		return wanted;
	}

	public boolean isFavorite() {
		return favorite;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public void setNote(double note) {
		this.note = note;
	}

	public void setWanted(boolean wanted) {
		this.wanted = wanted;
	}

	public void setFavorite(boolean favorite) {
		this.favorite = favorite;
	}
	
	
	
}
