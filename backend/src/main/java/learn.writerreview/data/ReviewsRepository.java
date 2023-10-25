public interface ReviewsRepository {
    void addReview(Review review);

    void updateReview(Review review);

    void deleteReview(int reviewId);

    List<Review> findAllReviews() throws ExecutionException, InterruptedException;

    Review findReviewById(int reviewId) throws ExecutionException, InterruptedException;

}
