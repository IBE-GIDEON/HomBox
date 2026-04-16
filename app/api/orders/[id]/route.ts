import { NextResponse } from 'next/server';
import { readOrders, updateOrderStatus } from '@/lib/ordersDb';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const segments = url.pathname.split('/');
    const orderId = segments[segments.length - 1];

    const orders = readOrders();
    const order = orders.find(o => o.id === orderId);

    if (!order) {
      return new NextResponse('Order not found', { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Order GET error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const url = new URL(request.url);
    const segments = url.pathname.split('/');
    const orderId = segments[segments.length - 1];

    const { status } = await request.json();
    const updated = updateOrderStatus(orderId, status);

    if (!updated) {
      return new NextResponse('Order not found', { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order PATCH error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
