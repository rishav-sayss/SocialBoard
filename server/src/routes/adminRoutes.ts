import { Router, Response } from 'express';
import { protect, AuthRequest } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';
import {
  getAllUsers,
  getAdminStats,
  getUserDetails,
  deleteUser,
  updateUserRole,
} from '../controllers/adminController';

const router = Router();

// ─── Apply auth middleware to all routes below ────────────────────────────────
router.use(protect);

// ─────────────────────────────────────────────────────────────────────────────
// READ-ONLY routes — accessible by both admin and superadmin
// ─────────────────────────────────────────────────────────────────────────────

// Dashboard welcome
router.get(
  '/dashboard',
  authorizeRoles('admin', 'superadmin'),
  (_req: AuthRequest, res: Response) => {
    res.json({ success: true, message: '🛡️ Welcome to the Admin Dashboard!' });
  }
);

// GET /api/admin/stats — admin & superadmin can view stats
router.get('/stats', authorizeRoles('admin', 'superadmin'), getAdminStats);

// GET /api/admin/users — admin & superadmin can list users (no passwords)
router.get('/users', authorizeRoles('admin', 'superadmin'), getAllUsers);

// GET /api/admin/users/:id — admin & superadmin can inspect user details (no passwords)
router.get('/users/:id', authorizeRoles('admin', 'superadmin'), getUserDetails);

// ─────────────────────────────────────────────────────────────────────────────
// PRIVILEGED routes — SUPERADMIN ONLY
// ❌ Regular admins cannot access these
// ─────────────────────────────────────────────────────────────────────────────

// PUT /api/admin/users/:id/role — superadmin only; cannot assign superadmin role
router.put('/users/:id/role', authorizeRoles('superadmin'), updateUserRole);

// DELETE /api/admin/users/:id — superadmin only; cannot delete other superadmins
router.delete('/users/:id', authorizeRoles('superadmin'), deleteUser);

// Superadmin panel route
router.get(
  '/superadmin',
  authorizeRoles('superadmin'),
  (_req: AuthRequest, res: Response) => {
    res.json({ success: true, message: '👑 Superadmin Panel — Full Control' });
  }
);

export default router;
