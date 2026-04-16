import { NextResponse } from 'next/server';
import { readDatabase } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const segments = url.pathname.split('/');
    const idStr = segments[segments.length - 1];
    
    const products = readDatabase();
    const product = products.find(p => p.id === parseInt(idStr));
    
    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
