import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class PostsTemplateRepository {
    private final Firestore firestore = FirestoreClient.getFirestore();
    private final CollectionReference postsCollection = firestore.collection("posts");

    public void createPost(Post post) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> result = postsCollection.document(post.getId()).set(post);
        result.get();
    }

    public Post getPost(String postId) throws ExecutionException, InterruptedException {
        DocumentReference documentReference = postsCollection.document(postId);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            return document.toObject(Post.class);
        } else {
            return null;
        }
    }

    public List<Post> getAllPosts() throws ExecutionException, InterruptedException {
        Query query = postsCollection.orderBy("timestamp", Query.Direction.DESCENDING);
        ApiFuture<QuerySnapshot> future = query.get();
        QuerySnapshot querySnapshot = future.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
        return documents.stream().map(document -> document.toObject(Post.class)).collect(Collectors.toList());
    }

    public void updatePost(Post post) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> result = postsCollection.document(post.getId()).set(post);
        result.get();
    }

    public void deletePost(String postId) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> result = postsCollection.document(postId).delete();
        result.get();
    }
}
