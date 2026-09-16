 import express from 'express';
import {
   CreatePost,
   getPosts,
   getPostById,
   updatePost,
   deletePost
} from '../controllers/PostController';
import upload from '../middleware/uploadMiddleware';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post(
  '/upload',
  protect,
  upload.single('image'),
  CreatePost
);

router.get('/', getPosts);
router.get('/:id', getPostById);

router.put("/:id", protect, upload.single("image"), updatePost);


router.delete(
  '/:id',
  protect,
   deletePost
);

export default router;