import { Response } from "express";
import User from "../models/User";
import Image from "../models/post";
import { AuthRequest } from "../middleware/authMiddleware";

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/admin/users
// Admin & Superadmin: read-only list of users
// ❌ Passwords are NEVER returned
// ─────────────────────────────────────────────────────────────────────────────
export const getAllUsers = async (
  _req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/admin/users/:id
// Admin & Superadmin: read-only user profile + their uploads
// ❌ Passwords are NEVER returned
// ─────────────────────────────────────────────────────────────────────────────
export const getUserDetails = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const images = await Image.find({ uploadedBy: user.id }).sort({
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
      message: "Failed to fetch user details",
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/admin/stats
// Admin & Superadmin: read-only platform statistics
// ─────────────────────────────────────────────────────────────────────────────
export const getAdminStats = async (
  _req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();
    const totalImages = await Image.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalImages,
        totalAdmins,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/admin/users/:id
// Superadmin ONLY (route is guarded by authorizeRoles("superadmin"))
// ❌ Cannot delete a superadmin account (immutable)
// ❌ Cannot delete an admin account unless requester is superadmin
// ─────────────────────────────────────────────────────────────────────────────
export const deleteUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const requestingRole = req.user?.role;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // ❌ Superadmin accounts are immutable — no one can delete them
    if (user.role === "superadmin") {
      res.status(403).json({
        success: false,
        message: "Superadmin accounts cannot be deleted.",
      });
      return;
    }

    // ❌ Only superadmin can delete admin accounts
    if (user.role === "admin" && requestingRole !== "superadmin") {
      res.status(403).json({
        success: false,
        message: "Only superadmins can remove admin accounts.",
      });
      return;
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/admin/users/:id/role
// Superadmin ONLY (route is guarded by authorizeRoles("superadmin"))
// ❌ Cannot assign "superadmin" role to anyone
// ❌ Cannot change role of an existing superadmin
// ─────────────────────────────────────────────────────────────────────────────
export const updateUserRole = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // ❌ "superadmin" is not an assignable role — only "user" or "admin" allowed
    if (!role || !["user", "admin"].includes(role)) {
      res.status(400).json({
        success: false,
        message:
          "Invalid role. Allowed values: 'user' or 'admin'. Cannot assign 'superadmin'.",
      });
      return;
    }

    const targetUser = await User.findById(id).select("-password");

    if (!targetUser) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // ❌ Superadmin role is immutable
    if (targetUser.role === "superadmin") {
      res.status(403).json({
        success: false,
        message: "The role of a superadmin account cannot be changed.",
      });
      return;
    }

    targetUser.role = role;
    await targetUser.save();

    res.status(200).json({
      success: true,
      message: `User role updated to '${role}'`,
      user: targetUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user role",
    });
  }
};