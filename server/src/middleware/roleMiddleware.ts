import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
import { UserRole } from '../models/User';

// ─── Role-Based Access Middleware ─────────────────────────────────────────────
// Usage: authorizeRoles('admin', 'superadmin')
export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Access denied. Required role: [${roles.join(', ')}]. Your role: [${req.user?.role || 'none'}]`,
      });
      return;
    }
    next();
  };
};
