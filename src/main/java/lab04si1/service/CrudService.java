package lab04si1.service;

import java.io.Serializable;
import java.util.List;

/**
 * Interface that defines base methods to be implemented by a service.
 *
 * @author Vélmer Oliveira
 */
public interface CrudService<T, ID extends Serializable> {

    List<T> findAll();

    T getById(ID id);

    T create(T t);

    T update(T t);

    boolean removeById(ID id);

}
