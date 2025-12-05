export interface User {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  senderUsername: string;
  content: string;
  imageUrl?: string;
  timestamp: Date;
}

export interface AuthPayload {
  userId: string;
  username: string;
}