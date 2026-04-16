import fs from 'fs';
import path from 'path';

export interface StoredOrderItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export interface StoredOrder {
  id: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'To Review';
  storeName: string;
  total: string;
  trackingStep: number;
  items: StoredOrderItem[];
  customerEmail?: string;
  customerName?: string;
  shippingAddress?: string;
}

const ordersFile = path.join(process.cwd(), 'orders.json');

export const readOrders = (): StoredOrder[] => {
  try {
    if (!fs.existsSync(ordersFile)) {
      writeOrders([]);
      return [];
    }
    const data = fs.readFileSync(ordersFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Orders DB read error:', error);
    return [];
  }
};

export const writeOrders = (orders: StoredOrder[]) => {
  try {
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf8');
  } catch (error) {
    console.error('Orders DB write error:', error);
  }
};

export const addOrder = (order: StoredOrder): StoredOrder => {
  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);
  return order;
};

export const updateOrderStatus = (orderId: string, status: StoredOrder['status']): boolean => {
  const orders = readOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx === -1) return false;
  orders[idx].status = status;
  orders[idx].trackingStep = status === 'Shipped' ? 2 : status === 'Delivered' ? 3 : orders[idx].trackingStep;
  writeOrders(orders);
  return true;
};
