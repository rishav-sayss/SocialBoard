import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Comment from '../models/Comment';
import Image from '../models/post';

// @desc    Add a comment to a post
// @route   POST /api/posts/:postId/comments
// @access  Private
export const addComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Not authorized.' });
      return;
    }

    if (!text || !text.trim()) {
      res.status(400).json({ success: false, message: 'Comment text is required.' });
      return;
    }

    const postExists = await Image.findById(postId);
    if (!postExists) {
      res.status(404).json({ success: false, message: 'Post not found.' });
      return;
    }

    const newComment = await Comment.create({
      user: userId,
      post: postId,
      text: text.trim(),
    });

    const populatedComment = await Comment.findById(newComment._id).populate(
      'user',
      'name email avatar'
    );

    res.status(201).json({
      success: true,
      message: 'Comment added successfully.',
      comment: populatedComment,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error adding comment.' });
  }
};

// @desc    Get comments of a post
// @route   GET /api/posts/:postId/comments
// @access  Public
export const getPostComments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate('user', 'name email avatar');

    res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error fetching comments.' });
  }
};

// @desc    Edit a comment
// @route   PUT /api/comments/:commentId
// @access  Private
export const updateComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Not authorized.' });
      return;
    }

    if (!text || !text.trim()) {
      res.status(400).json({ success: false, message: 'Comment text cannot be empty.' });
      return;
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ success: false, message: 'Comment not found.' });
      return;
    }

    // Check if user owns the comment
    if (comment.user.toString() !== userId) {
      res.status(403).json({ success: false, message: 'Not authorized to edit this comment.' });
      return;
    }

    comment.text = text.trim();
    await comment.save();

    const updatedComment = await Comment.findById(comment._id).populate(
      'user',
      'name email avatar'
    );

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully.',
      comment: updatedComment,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error updating comment.' });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:commentId
// @access  Private
export const deleteComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Not authorized.' });
      return;
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ success: false, message: 'Comment not found.' });
      return;
    }

    const isOwner = comment.user.toString() === userId;
    const isAdmin = userRole === 'admin' || userRole === 'superadmin';

    if (!isOwner && !isAdmin) {
      res.status(403).json({ success: false, message: 'Not authorized to delete this comment.' });
      return;
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully.',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error deleting comment.' });
  }
};
