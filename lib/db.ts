import fs from 'fs';
import path from 'path';
import { DBProduct, productsData as defaultData } from './data';

const dataFile = path.join(process.cwd(), 'data.json');

export const readDatabase = (): DBProduct[] => {
  try {
    if (!fs.existsSync(dataFile)) {
      writeDatabase(defaultData);
      return defaultData;
    }
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Database read error:', error);
    return defaultData; // Fallback to mock data on error
  }
};

export const writeDatabase = (data: DBProduct[]) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Database write error:', error);
  }
};
