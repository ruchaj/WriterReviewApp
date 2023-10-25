import java.util.List;

public interface GenresRepository {
    Genre add(Genre genre);

    Genre findById(int id);
    List<Genre> findAll();

    boolean update(Genre genre);

    boolean deleteById(int id);
}
