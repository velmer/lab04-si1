package lab04si1.repository;

import lab04si1.model.Series;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Repository that defines series' operations.
 *
 * @author Vélmer Oliveira
 */
public interface SeriesRepository extends CrudRepository<Series, String> {

    List<Series> findAll();
}
