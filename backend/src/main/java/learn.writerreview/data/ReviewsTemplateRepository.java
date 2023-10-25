import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class ReviewsTemplateRepository implements ReviewsRepository {
    private final Firestore firestore;

    public ReviewsTemplateRepository() {
        firestore = FirestoreClient.getFirestore();
    }

    public void addReview(Review review) {
        DocumentReference docRef = firestore.collection("reviews").document(String.valueOf(review.getReviewId()));
        docRef.set(review);
    }

    public void updateReview(Review review) {
        DocumentReference docRef = firestore.collection("reviews").document(String.valueOf(review.getReviewId()));
        docRef.set(review, SetOptions.merge());
    }

    public void deleteReview(int reviewId) {
        DocumentReference docRef = firestore.collection("reviews").document(String.valueOf(reviewId));
        docRef.delete();
    }

    public List<Review> findAllReviews() throws ExecutionException, InterruptedException {
        CollectionReference reviewsRef = firestore.collection("reviews");
        QuerySnapshot querySnapshot = reviewsRef.get().get();
        List<Review> reviews = querySnapshot.toObjects(Review.class);
        return reviews;
    }

    public Review findReviewById(int reviewId) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection("reviews").document(String.valueOf(reviewId));
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            return document.toObject(Review.class);
        }
        return null;
    }
}
    
}
