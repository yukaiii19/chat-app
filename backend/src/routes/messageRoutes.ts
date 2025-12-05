import { Router } from 'express';
import multer from 'multer';
import { sendMessage, getMessages } from '../controllers/messageController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

router.post('/send', authMiddleware, upload.single('image'), sendMessage);
router.get('/history', authMiddleware, getMessages);

export default router;