import java.util.List;
import java.util.concurrent.ExecutionException;

public class GenresService {

    private final GenresRepository genresRepository;

    public GenresService(GenresRepository genresRepository) {
        this.genresRepository = genresRepository;
    }

    public void addGenre(Genre genre) throws ValidationException {
        validateGenre(genre);
        genresRepository.addGenre(genre);
    }

    public void updateGenre(Genre genre) throws ValidationException {
        validateGenre(genre);
        genresRepository.updateGenre(genre);
    }

    public void deleteGenre(int genreId) {
        genresRepository.deleteGenre(genreId);
    }

    public List<Genre> findAllGenres() throws ExecutionException, InterruptedException {
        return genresRepository.findAllGenres();
    }

    public Genre findGenreById(int genreId) throws ExecutionException, InterruptedException {
        return genresRepository.findGenreById(genreId);
    }

    private void validateGenre(Genre genre) throws ValidationException {
        if (genre == null) {
            throw new ValidationException("Genre cannot be null.");
        }

        if (genre.getGenreName() == null || genre.getGenreName().isEmpty()) {
            throw new ValidationException("Genre name is required.");
        }
    }
}
