import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';

export async function GET() {
  const products = readDatabase();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const products = readDatabase();
    
    // Generate new ID
    const maxId = products.reduce((max, p) => p.id > max ? p.id : max, 0);
    const newProduct = {
      ...body,
      id: maxId + 1,
      stock_count: body.stock_count ?? 100,
      sold_count: body.sold_count ?? 0,
      rating: body.rating ?? 5.0
    };
    
    products.push(newProduct);
    writeDatabase(products);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
