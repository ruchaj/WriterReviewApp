import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class GenresTemplateRepository implements GenresRepository {
    private final Firestore firestore;

    public GenresTemplateRepository() {
        firestore = FirestoreClient.getFirestore();
    }

    public void addGenre(Genre genre) {
        DocumentReference docRef = firestore.collection("genres").document(String.valueOf(genre.getGenreId()));
        docRef.set(genre);
    }

    public void updateGenre(Genre genre) {
        DocumentReference docRef = firestore.collection("genres").document(String.valueOf(genre.getGenreId()));
        docRef.set(genre, SetOptions.merge());
    }

    public void deleteGenre(int genreId) {
        DocumentReference docRef = firestore.collection("genres").document(String.valueOf(genreId));
        docRef.delete();
    }

    public List<Genre> findAllGenres() throws ExecutionException, InterruptedException {
        CollectionReference genresRef = firestore.collection("genres");
        QuerySnapshot querySnapshot = genresRef.get().get();
        List<Genre> genres = querySnapshot.toObjects(Genre.class);
        return genres;
    }

    public Genre findGenreByName(String name) throws ExecutionException, InterruptedException {
        CollectionReference genresRef = firestore.collection("genres");
        Query query = genresRef.whereEqualTo("name", name).limit(1);
        QuerySnapshot querySnapshot = query.get().get();
        if (!querySnapshot.isEmpty()) {
            return querySnapshot.toObjects(Genre.class).get(0);
        }
        return null;
    }
}
