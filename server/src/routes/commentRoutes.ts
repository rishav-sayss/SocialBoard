import express from 'express';
import {
  addComment,
  getPostComments,
  updateComment,
  deleteComment,
} from '../controllers/commentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router({ mergeParams: true });

// Nested under post
router.post('/:postId/comments', protect, addComment);
router.get('/:postId/comments', getPostComments);

// Direct comment actions
router.put('/:commentId', protect, updateComment);
router.delete('/:commentId', protect, deleteComment);

export default router;
