const PostRepository = require('../repository/post_repository');

class PostService {
  postRepository = new PostRepository();

  showPost = async () => {
    const posts = await this.postRepository.showPost();
    return posts;
  };

  showOnePost = async ( id ) => {
    const posts = await this.postRepository.showOnePost( id );
    return posts;
  };

  createPost = async ( userId, title, content ) => {
    const newPost = await this.postRepository.createPost( 
      userId, 
      title, 
      content 
      );
    return newPost;
  };

  updatePost = async ( id, nickname, fieldsToBeUpdated ) => {
    const modifyPost = await this.postRepository.updatePost( 
      id, 
      nickname, 
      fieldsToBeUpdated 
      );
    return modifyPost;
  };

  deletePost = async ( id, nickname ) => {
    const deletedPost = await this.postRepository.deletePost(
      id,
      nickname
    );
    return deletedPost;
  };
}

module.exports = PostService;