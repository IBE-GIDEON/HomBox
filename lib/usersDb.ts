import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
  avatar: string;
}

const usersFile = path.join(process.cwd(), 'users.json');

export const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password + 'hombox-salt-2026').digest('hex');
};

export const readUsers = (): StoredUser[] => {
  try {
    if (!fs.existsSync(usersFile)) {
      writeUsers([]);
      return [];
    }
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Users DB read error:', error);
    return [];
  }
};

export const writeUsers = (users: StoredUser[]) => {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Users DB write error:', error);
  }
};

export const createUser = (email: string, name: string, password: string): StoredUser => {
  const users = readUsers();
  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    name,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
    avatar: name.charAt(0).toUpperCase(),
  };
  users.push(newUser);
  writeUsers(users);
  return newUser;
};

export const findUserByEmail = (email: string): StoredUser | null => {
  const users = readUsers();
  return users.find(u => u.email === email.toLowerCase()) || null;
};

export const verifyPassword = (user: StoredUser, password: string): boolean => {
  return user.passwordHash === hashPassword(password);
};
