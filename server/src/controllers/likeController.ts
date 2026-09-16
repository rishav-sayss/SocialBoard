import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Like from '../models/Like';
import Image from '../models/post';

// @desc    Like a post
// @route   POST /api/posts/:postId/like
// @access  Private
export const likePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Not authorized.' });
      return;
    }

    const postExists = await Image.findById(postId);
    if (!postExists) {
      res.status(404).json({ success: false, message: 'Post not found.' });
      return;
    }

    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      res.status(400).json({ success: false, message: 'You already liked this post.' });
      return;
    }

    await Like.create({ user: userId, post: postId });
    const totalLikes = await Like.countDocuments({ post: postId });

    res.status(201).json({
      success: true,
      message: 'Post liked successfully.',
      isLiked: true,
      totalLikes,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error liking post.' });
  }
};

// @desc    Unlike a post
// @route   DELETE /api/posts/:postId/like
// @access  Private
export const unlikePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Not authorized.' });
      return;
    }

    const deletedLike = await Like.findOneAndDelete({ user: userId, post: postId });
    if (!deletedLike) {
      res.status(400).json({ success: false, message: 'You have not liked this post.' });
      return;
    }

    const totalLikes = await Like.countDocuments({ post: postId });

    res.status(200).json({
      success: true,
      message: 'Post unliked successfully.',
      isLiked: false,
      totalLikes,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error unliking post.' });
  }
};

// @desc    Get total likes and current user like status for a post
// @route   GET /api/posts/:postId/likes
// @access  Public / Optional Auth
export const getPostLikes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    const userId = req.user?.id;

    const totalLikes = await Like.countDocuments({ post: postId });

    let isLiked = false;
    if (userId) {
      const userLike = await Like.findOne({ user: userId, post: postId });
      if (userLike) {
        isLiked = true;
      }
    }

    res.status(200).json({
      success: true,
      totalLikes,
      isLiked,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching likes.' });
  }
};
