import { NextResponse } from 'next/server';
import { readOrders, addOrder, StoredOrder } from '@/lib/ordersDb';

export async function GET() {
  const orders = readOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order: StoredOrder = {
      id: body.id || `ORD-${Math.floor(Math.random() * 90000000) + 10000000}`,
      date: body.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
      storeName: 'HomBox Verified Shipping',
      total: body.total,
      trackingStep: 1,
      items: body.items || [],
      customerEmail: body.customerEmail,
      customerName: body.customerName,
      shippingAddress: body.shippingAddress,
    };

    const saved = addOrder(order);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Order POST error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
