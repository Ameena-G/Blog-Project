import { Router } from 'express';
import { body } from 'express-validator';
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/postController.js';

const router = Router();

const validators = [
  body('title').isString().trim().isLength({ min: 3 }).withMessage('Title ≥ 3 chars'),
  body('content').isString().isLength({ min: 10 }).withMessage('Content ≥ 10 chars'),
  body('author').optional().isString().trim(),
  body('coverImage').optional().isURL().withMessage('coverImage must be a valid URL'),
  body('tags').optional().isArray()
];

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', validators, createPost);
router.put('/:id', validators, updatePost);
router.delete('/:id', deletePost);

export default router;