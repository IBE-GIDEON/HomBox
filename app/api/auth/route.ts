import { NextResponse } from 'next/server';
import { createUser, findUserByEmail, verifyPassword } from '@/lib/usersDb';

export async function POST(request: Request) {
  try {
    const { action, email, name, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (action === 'register') {
      if (!name) {
        return NextResponse.json({ error: 'Name is required for registration' }, { status: 400 });
      }

      const existing = findUserByEmail(email);
      if (existing) {
        return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
      }

      const user = createUser(email, name, password);
      
      // Return user without password hash
      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        createdAt: user.createdAt,
      }, { status: 201 });
    }

    if (action === 'login') {
      const user = findUserByEmail(email);
      if (!user) {
        return NextResponse.json({ error: 'No account found with this email' }, { status: 401 });
      }

      if (!verifyPassword(user, password)) {
        return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
      }

      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        createdAt: user.createdAt,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
