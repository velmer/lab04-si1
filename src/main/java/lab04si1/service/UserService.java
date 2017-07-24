package lab04si1.service;

import lab04si1.model.User;
import lab04si1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * User's service.
 *
 * @author Vélmer Oliveira
 */
@Service
public class UserService implements CrudService<User, Long> {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public User getById(Long id) {
        return this.userRepository.findOne(id);
    }

    public User getByEmail(String email) {
        return this.userRepository.getByEmail(email);
    }

    public User getByEmailAndPassword(String email, String password) {
        return this.userRepository.getByEmailAndPassword(email, password);
    }

    public boolean exists(String email) {
        return this.getByEmail(email) != null;
    }

    @Override
    public User create(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public User update(User user) {
        return this.userRepository.exists(user.getId()) ? this.userRepository.save(user) : null;
    }

    @Override
    public boolean removeById(Long id) {
        if (this.userRepository.exists(id)) {
            this.userRepository.delete(id);
            return true;
        }
        return false;
    }

}
