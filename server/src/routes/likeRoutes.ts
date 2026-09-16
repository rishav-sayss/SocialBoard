import express from 'express';
import { likePost, unlikePost, getPostLikes } from '../controllers/likeController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router({ mergeParams: true });

router.post('/:postId/like', protect, likePost);
router.delete('/:postId/like', protect, unlikePost);
router.get('/:postId/likes', getPostLikes);

export default router;
