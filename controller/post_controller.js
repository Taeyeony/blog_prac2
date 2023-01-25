const PostService = require('../service/post_service');

const { 
  postCreateValidation, 
  postUpdateValidation, 
} = require('../validations');

class PostController {
  postService = new PostService();

// 게시글 조회
  showPost = async (req, res) => {
    try { 
      const posts = await this.postService.showPost();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
// 게시글 상세 조회
  showOnePost = async (req, res) => {
    const { id } = req.params;
    try {
      const posts = await this.postService.showOnePost( id );
      res.json(posts);
    } catch(err) {
      res.status(500).json({ message: err.message });
    }    
  };
// 게시글 작성
  createPost = async (req, res) => {
    const { currentUser } = res.locals;
    const userId = currentUser.id;
    try {
      const { title, content } = await postCreateValidation.validateAsync(
        req.body
      );
      const newPost = await this.postService.createPost( userId, title, content );
      res.json(newPost);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
// 게시글 수정  
  updatePost = async (req, res) => {
    const { id } = req.params;
    const { currentUser } = res.locals;
    const nickname = currentUser.nickname;
    const fieldsToBeUpdated = await postUpdateValidation.validateAsync(
      req.body
    );
    try { 
      const modifyPost = await this.postService.updatePost( 
      id, 
      nickname, 
      fieldsToBeUpdated 
      );
      res.json(modifyPost);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }   
  };
// 게시글 삭제  
  deletePost = async (req, res) => { 
    const { id } = req.params;
    const { currentUser } = res.locals;
    const nickname = currentUser.nickname;
    try {
      const deletedPost = await this.postService.deletePost(
        id,
        nickname
      );
      res.json(deletedPost);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = PostController;