import java.util.List;
import java.util.concurrent.ExecutionException;

public class ReviewsService {

    private final ReviewsRepository reviewsRepository;

    public ReviewsService(ReviewsRepository reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }

    public void addReview(Review review) throws ValidationException {
        validateReview(review);
        reviewsRepository.addReview(review);
    }

    public void updateReview(Review review) throws ValidationException {
        validateReview(review);
        reviewsRepository.updateReview(review);
    }

    public void deleteReview(int reviewId) {
        reviewsRepository.deleteReview(reviewId);
    }

    public List<Review> findAllReviews() throws ExecutionException, InterruptedException {
        return reviewsRepository.findAllReviews();
    }

    public Review findReviewById(int reviewId) throws ExecutionException, InterruptedException {
        return reviewsRepository.findReviewById(reviewId);
    }

    private void validateReview(Review review) throws ValidationException {
        if (review == null) {
            throw new ValidationException("Review cannot be null.");
        }

        if (review.getContent() == null || review.getContent().isEmpty()) {
            throw new ValidationException("Review content is required.");
        }
        if (review.getUserId() <= 0) {
            throw new ValidationException("Invalid user ID in the review.");
        }
        if (review.getReviewDate() == null) {
            throw new ValidationException("Review date is required.");
        }
    }
}
