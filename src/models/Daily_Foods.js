
import { api } from './api';

export async function getDailyFoods() {
  const x = await api('Daily_Foods');
  return x;
}

export async function add(data) {
  const x = await api('Daily_Foods', data);
  return x;
}

export async function get(data) {
  const x = await api('Daily_Foods/getID', data);
  return x;
}