package lab04si1.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Entity to represent a series.
 *
 * @author Vélmer Oliveira
 */
@SuppressWarnings("unused")
@Entity(name = "Series")
@Table(name = "tb_series")
public class Series {

    @Id
    @NotNull
    private String imdbId;

    @NotNull
    @Column
    private String title;

    @Column
    private String year;

    @Column
    private String genre;

    @Column
    private String director;

    @Column
    private String writer;

    @Column
    private String actors;

    @Column
    private String plot;

    @Column
    private String poster;

    @Column
    private String rated;

    @Column
    private String language;

    @Column
    private int season;

    @Column
    private int lastEpisode;

    @NotNull
    @Column
    private double imdbRating;

    @Column
    private double rating;

    public Series(String imdbId, String title, String year, String genre, String director, String writer,
                  String actors, String plot, String poster, String rated, String language, int season,
                  int lastEpisode, double imdbRating,double rating) {

        this.imdbId = imdbId;
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.director = director;
        this.writer = writer;
        this.actors = actors;
        this.plot = plot;
        this.poster = poster;
        this.rated = rated;
        this.language = language;
        this.season = season;
        this.lastEpisode = lastEpisode;
        this.imdbRating = imdbRating;
        this.rating = rating;
    }

    public Series() {

    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getActors() {
        return actors;
    }

    public void setActors(String actors) {
        this.actors = actors;
    }

    public String getPlot() {
        return plot;
    }

    public void setPlot(String plot) {
        this.plot = plot;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getRated() {
        return rated;
    }

    public void setRated(String rated) {
        this.rated = rated;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public int getSeason() {
        return season;
    }

    public void setSeason(int season) {
        this.season = season;
    }

    public int getLastEpisode() {
        return lastEpisode;
    }

    public void setLastEpisode(int lastEpisode) {
        this.lastEpisode = lastEpisode;
    }

    public double getImdbRating() {
        return imdbRating;
    }

    public void setImdbRating(double imdbRating) {
        this.imdbRating = imdbRating;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Series series = (Series) o;

        return imdbId.equals(series.imdbId);
    }

    @Override
    public int hashCode() {
        return imdbId.hashCode();
    }

    @Override
    public String toString() {
        return "Series{" +
                "imdbId='" + imdbId + '\'' +
                ", title='" + title + '\'' +
                ", writer='" + writer + '\'' +
                ", imdbRating=" + imdbRating +
                '}';
    }
}
