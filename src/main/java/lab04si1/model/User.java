package lab04si1.model;

import javax.validation.constraints.NotNull;
import javax.persistence.*;
import java.util.List;

/**
 * Entity to represent a user.
 *
 * @author Vélmer Oliveira
 */
@SuppressWarnings("unused")
@Entity(name = "User")
@Table(name = "tb_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column
    private String name;

    @NotNull
    @Column(unique = true)
    private String email;

    @NotNull
    @Column
    private String password;

    @Column
    @ElementCollection(targetClass=String.class)
    private List<String> profileSeries;

    @Column
    @ElementCollection(targetClass=String.class)
    private List<String> watchlistSeries;

    public User(String name, String email, String password, List<String> profileSeries,
                List<String> watchlistSeries) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.profileSeries = profileSeries;
        this.watchlistSeries = watchlistSeries;
    }

    public User() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getProfileSeries() {
        return profileSeries;
    }

    public void setProfileSeries(List<String> profileSeries) {
        this.profileSeries = profileSeries;
    }

    public List<String> getWatchlistSeries() {
        return watchlistSeries;
    }

    public void setWatchlistSeries(List<String> watchlistSeries) {
        this.watchlistSeries = watchlistSeries;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        return id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", profileSeries=" + profileSeries +
                ", watchlistSeries=" + watchlistSeries +
                '}';
    }
}
