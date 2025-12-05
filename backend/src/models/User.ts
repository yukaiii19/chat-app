import { User } from '../types/index';
import * as bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(__dirname, '../../data/users.json');

const ensureDataDir = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const loadUsers = (): User[] => {
  ensureDataDir();
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

const saveUsers = (users: User[]) => {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};

let users: User[] = loadUsers();

export const initializeUsers = () => {
  if (users.length === 0) {
    createUser('admin', 'admin123');
    createUser('testuser', 'password123');
    createUser('john', 'john123');
    console.log('✅ Default users created');
  }
};

export const createUser = (username: string, password: string): User => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user: User = {
    id: Date.now().toString() + Math.random(),
    username,
    password: hashedPassword,
    createdAt: new Date()
  };
  users.push(user);
  saveUsers(users);
  return user;
};

export const findUserByUsername = (username: string): User | undefined => {
  return users.find(u => u.username === username);
};

export const findUserById = (id: string): User | undefined => {
  return users.find(u => u.id === id);
};

export const validatePassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};