import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AuthorsTemplateRepositoryTest {
    private Firestore firestore;
    private AuthorsTemplateRepository authorsRepository;

    @BeforeEach
    void setUp() {
        firestore = FirestoreClient.getFirestore();
        authorsRepository = new AuthorsTemplateRepository();
    }

    @Test
    void testAddAuthor() {
        Author author = new Author();
        author.setUserId(1);
        author.setEmail("testauthor@example.com");

        authorsRepository.addAuthor(author);

        DocumentSnapshot document = firestore.collection("authors").document("1").get();
        assertTrue(document.exists());
        Author retrievedAuthor = document.toObject(Author.class);
        assertEquals("testauthor@example.com", retrievedAuthor.getEmail());
    }

    @Test
    void testUpdateAuthor() {
        Author author = new Author();
        author.setUserId(2);
        author.setEmail("testauthor@example.com");

        authorsRepository.addAuthor(author);

        author.setEmail("updatedauthor@example.com");
        authorsRepository.updateAuthor(author);

        DocumentSnapshot document = firestore.collection("authors").document("2").get();
        assertTrue(document.exists());
        Author updatedAuthor = document.toObject(Author.class);
        assertEquals("updatedauthor@example.com", updatedAuthor.getEmail());
    }

    @Test
    void testDeleteAuthor() {
        Author author = new Author();
        author.setUserId(3);
        author.setEmail("testauthor@example.com");

        authorsRepository.addAuthor(author);

        authorsRepository.deleteAuthor(3);

        DocumentSnapshot document = firestore.collection("authors").document("3").get();
        assertFalse(document.exists());
    }

    @Test
    void testFindAuthorByEmail() {
        Author author = new Author();
        author.setUserId(4);
        author.setEmail("testauthor@example.com");

        authorsRepository.addAuthor(author);

        Author foundAuthor = authorsRepository.findAuthorByEmail("testauthor@example.com");

        assertNotNull(foundAuthor);
        assertEquals(4, foundAuthor.getUserId());
    }
}
