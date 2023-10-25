import java.util.List;
import java.util.concurrent.ExecutionException;

public interface AuthorsRepository {
    void addAuthor(Author author);

    void updateAuthor(Author author);

    void deleteAuthor(int userId);

    List<Author> findAllAuthors() throws ExecutionException, InterruptedException;

    Author findAuthorByEmail(String email) throws ExecutionException, InterruptedException;
}
