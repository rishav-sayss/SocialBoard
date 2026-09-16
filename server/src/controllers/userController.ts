import { Response } from "express";
import User from "../models/User";
import Image from "../models/post";
import { AuthRequest } from "../middleware/authMiddleware";


  //profile APis

// GET /api/users/profile
// Logged-in user profile + uploaded images
export const getMyProfile = async (
  req:  AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id;
    console.log(userId)
    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const images = await Image.find({
      uploadedBy: userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      user,
      images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

// PUT /api/users/profile
// Update logged-in user profile
export const updateMyProfile = async (
  req:  AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id;

    const { name, bio, avatar, socialHandles } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }
    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    if (socialHandles !== undefined) {
      user.socialHandles = {
        ...user.socialHandles,
        ...socialHandles,
      };
    }

    await user.save();

    const updatedUser = await User.findById(userId).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

// GET /api/users/:id
// Public user profile + uploaded images
export const getUserById = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password -role");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const images = await Image.find({
      uploadedBy: id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      user,
      images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
    });
  }
};


//User: Can create, edit, and delete their own posts
