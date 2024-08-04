import { Request, Response } from 'express';
import { Post, User, Category, Comment, PostCategory } from '../models';
import { validationResult } from 'express-validator';

// Create a new post
export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const post = await Post.create({ ...req.body, userId: req.user?.id });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Post not created' });
    }
  };

// Get all posts with associated users, categories, and comments
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: User, as: 'user' },
                { model: Category, as: 'categories' },
                { model: Comment, as: 'comments' }
            ]
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
};

// Get a post by ID with associated users, categories, and comments
export const getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findByPk(req.params.postId, {
            include: [
                { model: User, as: 'user' },
                { model: Category, as: 'categories' },
                { model: Comment, as: 'comments' }
            ]
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve post' });
    }
};

// Update a post by ID
export const updatePostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findByPk(req.params.postId);
        if (post?.userId !== req.user?.id) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }

        const { title, content } = req.body;
        const [updated] = await Post.update({ title, content }, {
            where: { id: req.params.postId }
        });

        if (updated) {
            const updatedPost = await Post.findByPk(req.params.postId);
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update post' });
    }
};

// Delete a post by ID
export const deletePostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findByPk(req.params.postId);
        if (post?.userId !== req.user?.id) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }

        const deleted = await Post.destroy({
            where: { id: req.params.postId }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
};

// Create a new comment for a post
export const createCommentForPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findByPk(req.params.postId);
        if (post) {
            const comment = await Comment.create({ ...req.body, postId: post.id, userId: req.user?.id });
            res.status(201).json(comment);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
};

// Get categories for a specific post
export const getCategoriesForPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findByPk(req.params.postId, {
            include: [{ model: Category, as: 'categories' }]
        });
        if (post) {
            res.status(200).json(post.get('categories'));
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve categories' });
    }
};

// Get comments for a specific post
export const getCommentsForPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findByPk(req.params.postId, {
            include: [{ model: Comment, as: 'comments' }]
        });
        if (post) {
            res.status(200).json(post.get('comments'));
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve comments' });
    }
};

// Create a new category for a post
export const createCategoryForPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findByPk(req.params.postId);
        if (post?.userId !== req.user?.id) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }

        const category = await Category.create(req.body);
        await PostCategory.create({ postId: post?.id, categoryId: category.id });
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create category' });
    }
};
