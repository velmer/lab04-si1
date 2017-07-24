package lab04si1.service;

import lab04si1.model.Series;
import lab04si1.repository.SeriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Series' service.
 *
 * @author Vélmer Oliveira
 */
@Service
public class SeriesService implements CrudService<Series, String> {

    private SeriesRepository seriesRepository;

    @Autowired
    public SeriesService(SeriesRepository seriesRepository) {
        this.seriesRepository = seriesRepository;
    }

    @Override
    public List<Series> findAll() {
        return this.seriesRepository.findAll();
    }

    public List<Series> findAll(List<String> ids) {
        List<Series> allSeriesList = this.seriesRepository.findAll(),
                     seriesListToReturn = new ArrayList<>();

        Series series = new Series();
        for (String id : ids) {
            series.setImdbId(id);
            int seriesIndex = allSeriesList.indexOf(series);
            if (seriesIndex != -1) {
                seriesListToReturn.add(allSeriesList.get(seriesIndex));
            }
        }

        return seriesListToReturn;
    }

    public boolean exists(String id) {
        return this.getById(id) != null;
    }

    @Override
    public Series getById(String id) {
        return this.seriesRepository.findOne(id);
    }

    @Override
    public Series create(Series series) {
        return this.seriesRepository.save(series);
    }

    @Override
    public Series update(Series series) {
        return this.seriesRepository.exists(series.getImdbId()) ? this.seriesRepository.save(series) : null;
    }

    @Override
    public boolean removeById(String id) {
        if (this.seriesRepository.exists(id)) {
            this.seriesRepository.delete(id);
            return true;
        }

        return false;
    }

}
