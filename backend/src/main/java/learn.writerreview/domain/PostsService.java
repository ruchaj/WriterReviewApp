import java.util.List;
import java.util.concurrent.ExecutionException;

public class PostsService {

    private final PostsRepository postsRepository;

    public PostsService(PostsRepository postsRepository) {
        this.postsRepository = postsRepository;
    }

    public void addPost(Post post) throws ValidationException {
        validatePost(post);
        postsRepository.addPost(post);
    }

    public void updatePost(Post post) throws ValidationException {
        validatePost(post);
        postsRepository.updatePost(post);
    }

    public void deletePost(int postId) {
        postsRepository.deletePost(postId);
    }

    public List<Post> findAllPosts() throws ExecutionException, InterruptedException {
        return postsRepository.findAllPosts();
    }

    public Post findPostById(int postId) throws ExecutionException, InterruptedException {
        return postsRepository.findPostById(postId);
    }

    private void validatePost(Post post) throws ValidationException {
        if (post == null) {
            throw new ValidationException("Post cannot be null.");
        }

        if (post.getTitle() == null || post.getTitle().isEmpty()) {
            throw new ValidationException("Post title is required.");
        }

        if (post.getContent() == null || post.getContent().isEmpty()) {
            throw new ValidationException("Post content is required.");
        }

        if (post.getUserId() <= 0) {
            throw new ValidationException("Invalid user ID for the post.");
        }
        if(post.getGenreId() == null || post.getGenreId().isEmpty()) {
            throw new ValidationException("Invalid genre ID for the post.");
        }

    }
}
