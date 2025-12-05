import { Request, Response } from 'express';
import { saveMessage, getAllMessages } from '../models/Message';
import fs from 'fs';
import path from 'path';

export const sendMessage = (req: Request, res: Response) => {
  try {
    const content = req.body.content || '';
    const userId = (req as any).userId;
    const username = (req as any).username;

    console.log('\n=== MESSAGE RECEIVED ===');
    console.log('Content:', content);
    console.log('File:', req.file ? `${req.file.originalname} (${req.file.size} bytes)` : 'No file');

    let imageUrl: string | undefined = undefined;

    // Handle file upload
    if (req.file) {
      try {
        const uploadDir = path.join(__dirname, '../../public/uploads');
        
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
        const filepath = path.join(uploadDir, filename);
        
        fs.writeFileSync(filepath, req.file.buffer);
        imageUrl = `/uploads/${filename}`;
        
        console.log('✅ Image saved:', imageUrl);
      } catch (error) {
        console.error('❌ Image save error:', error);
        return res.status(500).json({ error: 'Failed to save image' });
      }
    }

    // Validate
    if (!content.trim() && !imageUrl) {
      console.log('❌ Validation failed');
      return res.status(400).json({ error: 'Content or image required' });
    }

    // Save message
    const message = saveMessage(userId, username, content, imageUrl);
    console.log('✅ Message saved:', message.id);
    console.log('=== END MESSAGE ===\n');
    
    res.status(201).json({ 
      message: 'Message sent', 
      data: message 
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getMessages = (req: Request, res: Response) => {
  try {
    const messages = getAllMessages();
    res.json({ data: messages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};