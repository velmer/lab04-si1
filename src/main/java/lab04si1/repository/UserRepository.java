package lab04si1.repository;

import lab04si1.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Repository that defines user's operations.
 *
 * @author Vélmer Oliveira
 */
public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findAll();

    User getByEmail(String email);

    User getByEmailAndPassword(String email, String password);
}
