import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import  PostModel from "../models/post";
import { AuthRequest } from "../middleware/authMiddleware";

export const  CreatePost = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
      return;
    }

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not authorized",
      });
      return;
    }

    const { caption } = req.body;

    const { imageUrl, publicId } = await uploadToCloudinary(req.file.buffer);

    // console.log('Cloudinary upload result:', uploadResult);

    const image = await PostModel.create({
      imageUrl,
      publicId,
      caption,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Post uploaded successfully",
      image,
    });
  } catch (error: any) {
    console.error("Upload Post error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload Post",
    });
  }
};

export const getPosts = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const Posts = await PostModel.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: Posts.length,
      Posts,
    });
  } catch (error) {
    console.error("Get Post error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Post",
    });
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id).populate("uploadedBy", "name email");

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Get Post By ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch post details",
    });
  }
};


export const updatePost = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { caption } = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // Find post
    const post = await PostModel.findById(id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    // Check ownership
    if (post.uploadedBy.toString() !== userId.toString()) {
      res.status(403).json({
        success: false,
        message: "You can only edit your own posts",
      });
      return;
    }

    // Update caption
    if (caption !== undefined) {
      post.caption = caption;
    }

    // If new image is provided
    if (req.file) {
      // 1. Delete old image from Cloudinary
      await cloudinary.uploader.destroy(post.publicId);

      // 2. Upload new image
      const { imageUrl, publicId } = await uploadToCloudinary(req.file.buffer);

      // 3. Update MongoDB
      post.imageUrl = imageUrl;
      post.publicId = publicId;
    }

    // Save changes
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error("Update post error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update post",
    });
  }
};

export const  deletePost = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not authorized",
      });
      return;
    }

    const image = await PostModel.findById(req.params.id);

    if (!image) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    if (image.uploadedBy.toString() !== req.user.id.toString()) {
      res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image",
      });
      return;
    }

    await cloudinary.uploader.destroy(image.publicId);

    await image.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete  Post error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete image",
    });
  }
};
