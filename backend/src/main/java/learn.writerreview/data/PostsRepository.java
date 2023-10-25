import java.util.List;

public interface PostsRepository {
    void addPost(Post post);
    
    Post getPostById(int id);
    List<Post> getAllPosts();
    
    void updatePost(Post post);
    
    void deletePost(int id);
}
