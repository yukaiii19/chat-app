import fs from 'fs';
import path from 'path';

export interface Message {
  id: string;
  senderId: string;
  senderUsername: string;
  content: string;
  imageUrl?: string;
  timestamp: string;
}

const DATA_FILE = path.join(__dirname, '../../data/messages.json');

const ensureDataDir = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const loadMessages = (): Message[] => {
  ensureDataDir();
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

const saveMessages = (messages: Message[]) => {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
};

let messages: Message[] = loadMessages();

export const saveMessage = (
  senderId: string,
  senderUsername: string,
  content: string,
  imageUrl?: string
): Message => {
  const message: Message = {
    id: Date.now().toString() + Math.random(),
    senderId,
    senderUsername,
    content,
    imageUrl,
    timestamp: new Date().toISOString()
  };
  
  messages.push(message);
  saveMessages(messages);
  
  return message;
};

export const getAllMessages = (): Message[] => {
  return messages;
};

export const clearMessages = () => {
  messages = [];
  saveMessages(messages);
};