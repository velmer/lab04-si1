package lab04si1.controller;

import lab04si1.model.Series;
import lab04si1.model.User;
import lab04si1.service.SeriesService;
import lab04si1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Rest controller that defines the endpoints for User entity.
 *
 * @author Vélmer Oliveira
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/users")
public class UserRestController {

    private UserService userService;
    private SeriesService seriesService;

    @Autowired
    public UserRestController(UserService userService, SeriesService seriesService) {
        this.userService = userService;
        this.seriesService = seriesService;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<User> login(@RequestBody User user) {
        if (!this.userService.exists(user.getEmail()))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(this.userService.getByEmailAndPassword(user.getEmail(), user.getPassword()), HttpStatus.OK);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity register(@RequestBody User user) {
        boolean userAlreadyExists = this.userService.exists(user.getEmail());

        if (userAlreadyExists) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        this.userService.create(user);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<List<User>> findAll() {
        return new ResponseEntity<>(this.userService.findAll(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<User> getByEmail(@RequestParam("email") String email) {
        User user = this.userService.getByEmail(email);

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/profile", method = RequestMethod.GET)
    public ResponseEntity<List<Series>> getProfileSeries(@RequestParam("email") String email) {
        User user = this.userService.getByEmail(email);

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(this.seriesService.findAll(user.getProfileSeries()), HttpStatus.OK);
    }

    @RequestMapping(value = "/profile/add/{seriesId}", method = RequestMethod.PUT)
    public ResponseEntity<User> addSeriesToProfile(@RequestParam("email") String email,  @PathVariable("seriesId") String seriesId) {
        User user = this.userService.getByEmail(email);

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else if (user.getProfileSeries().contains(seriesId)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        user.getProfileSeries().add(seriesId);

        if (user.getWatchlistSeries().contains(seriesId)) {
            user.getWatchlistSeries().remove(seriesId);
        }

        return new ResponseEntity<>(this.userService.update(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/profile/delete/{seriesId}", method = RequestMethod.PUT)
    public ResponseEntity<User> removeSeriesFromProfile(@RequestParam("email") String email,  @PathVariable("seriesId") String seriesId) {
        User user = this.userService.getByEmail(email);

        if(user == null || !user.getProfileSeries().contains(seriesId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        user.getProfileSeries().remove(seriesId);

        return new ResponseEntity<>(this.userService.update(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/watchlist", method = RequestMethod.GET)
    public ResponseEntity<List<Series>> getWatchlistSeries(@RequestParam("email") String email) {
        User user = this.userService.getByEmail(email);

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(this.seriesService.findAll(user.getWatchlistSeries()), HttpStatus.OK);
    }

    @RequestMapping(value = "/watchlist/add/{seriesId}", method = RequestMethod.PUT)
    public ResponseEntity<User> addSeriesToWatchlist(@RequestParam("email") String email,  @PathVariable("seriesId") String seriesId) {
        User user = this.userService.getByEmail(email);

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else if (user.getWatchlistSeries().contains(seriesId)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        user.getWatchlistSeries().add(seriesId);

        if (user.getProfileSeries().contains(seriesId)) {
            user.getProfileSeries().remove(seriesId);
        }

        return new ResponseEntity<>(this.userService.update(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/watchlist/delete/{seriesId}", method = RequestMethod.PUT)
    public ResponseEntity<User> removeSeriesFromWatchlist(@RequestParam("email") String email,  @PathVariable("seriesId") String seriesId) {
        User user = this.userService.getByEmail(email);

        if(user == null || !user.getWatchlistSeries().contains(seriesId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        user.getWatchlistSeries().remove(seriesId);

        return new ResponseEntity<>(this.userService.update(user), HttpStatus.OK);
    }
}
