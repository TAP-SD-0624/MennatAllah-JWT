import { Router } from 'express';
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById,
    createCommentForPost,
    getCategoriesForPost,
    getCommentsForPost,
    createCategoryForPost
} from '../controllers/postController';
import  {authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:postId', getPostById);
router.get('/:postId/comments', getCommentsForPost);
router.get('/:postId/categories', getCategoriesForPost);

// Protected routes
router.post('/', authMiddleware, createPost);
router.put('/:postId', authMiddleware, updatePostById);
router.delete('/:postId', authMiddleware, deletePostById);
router.post('/:postId/comments', authMiddleware, createCommentForPost);
router.post('/:postId/categories', authMiddleware, createCategoryForPost);

export default router;
