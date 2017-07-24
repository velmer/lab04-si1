package lab04si1.controller;

import lab04si1.model.Series;
import lab04si1.service.SeriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Rest controller that defines the endpoints for Series entity.
 *
 * @author Vélmer Oliveira
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/series")
public class SeriesRestController {

    private SeriesService seriesService;

    @Autowired
    public SeriesRestController(SeriesService seriesService) {
        this.seriesService = seriesService;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<List<Series>> findAll() {
        return new ResponseEntity<>(this.seriesService.findAll(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Series> saveSeries(@RequestBody Series series) {
        boolean seriesAlreadyExists = this.seriesService.exists(series.getImdbId());

        if (seriesAlreadyExists) {
            return new ResponseEntity<>(series, HttpStatus.OK);
        }

        this.seriesService.create(series);
        return new ResponseEntity<>(series, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{imdbId}", method = RequestMethod.PUT)
    public ResponseEntity<Series> updateSeries(@PathVariable String imdbId, @RequestBody Series series) {
        boolean seriesExists = this.seriesService.exists(imdbId);

        if (!seriesExists) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(this.seriesService.update(series), HttpStatus.OK);
    }

    @RequestMapping(value = "/{imdbId}", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteSeries(@PathVariable String imdbId) {
        boolean seriesExists = this.seriesService.exists(imdbId);

        if (!seriesExists) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }

        this.seriesService.removeById(imdbId);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
