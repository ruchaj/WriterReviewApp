import java.util.List;
import java.util.concurrent.ExecutionException;

public class AuthorsService {

    private final AuthorsRepository authorsRepository;

    public AuthorsService(AuthorsRepository authorsRepository) {
        this.authorsRepository = authorsRepository;
    }

    public void addAuthor(Author author) throws ValidationException {
        validateAuthor(author);
        authorsRepository.addAuthor(author);
    }

    public void updateAuthor(Author author) throws ValidationException {
        validateAuthor(author);
        authorsRepository.updateAuthor(author);
    }

    public void deleteAuthor(int userId) {
        authorsRepository.deleteAuthor(userId);
    }

    public List<Author> findAllAuthors() throws ExecutionException, InterruptedException {
        return authorsRepository.findAllAuthors();
    }

    public Author findAuthorByEmail(String email) throws ExecutionException, InterruptedException {
        return authorsRepository.findAuthorByEmail(email);
    }

    private void validateAuthor(Author author) throws ValidationException {
        if (author == null) {
            throw new ValidationException("Author cannot be null.");
        }

        if (author.getEmail() == null || author.getEmail().isEmpty()) {
            throw new ValidationException("Author email is required.");
        }
        if((author.getUsername() == null) || (author.getUsername().isEmpty())) {
            throw new ValidationException("Author username is required.");
        }
        if((author.getPassword() == null) || (author.getPassword().isEmpty())) {
            throw new ValidationException("Author password is required.");
        }
    }
}
