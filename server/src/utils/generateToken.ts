import jwt from 'jsonwebtoken';
import { UserRole } from '../models/User';

const generateToken = (id: string, role: UserRole): string => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' } as jwt.SignOptions
  );
};

export default generateToken;
