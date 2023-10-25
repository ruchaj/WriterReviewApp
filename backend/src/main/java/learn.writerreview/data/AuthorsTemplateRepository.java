import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class AuthorsTemplateRepository implements AuthorsRepository {
    private final Firestore firestore;

    public AuthorDataLayer() {
        firestore = FirestoreClient.getFirestore();
    }

    public void addAuthor(Author author) {
        DocumentReference docRef = firestore.collection("authors").document(String.valueOf(author.getUserId()));
        docRef.set(author);
    }

    public void updateAuthor(Author author) {
        DocumentReference docRef = firestore.collection("authors").document(String.valueOf(author.getUserId()));
        docRef.set(author, SetOptions.merge());
    }

    public void deleteAuthor(int userId) {
        DocumentReference docRef = firestore.collection("authors").document(String.valueOf(userId));
        docRef.delete();
    }

    public List<Author> findAllAuthors() throws ExecutionException, InterruptedException {
        CollectionReference authorsRef = firestore.collection("authors");
        QuerySnapshot querySnapshot = authorsRef.get().get();
        List<Author> authors = querySnapshot.toObjects(Author.class);
        return authors;
    }

    public Author findAuthorByEmail(String email) throws ExecutionException, InterruptedException {
        CollectionReference authorsRef = firestore.collection("authors");
        Query query = authorsRef.whereEqualTo("email", email).limit(1);
        QuerySnapshot querySnapshot = query.get().get();
        if (!querySnapshot.isEmpty()) {
            return querySnapshot.toObjects(Author.class).get(0);
        }
        return null;
    }
}
