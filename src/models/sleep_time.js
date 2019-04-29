import { api } from './api';

export async function addsleep(data) {
    const x = await api('sleep_time', data);
    return x;
  }
export async function updatesleep(data) {
    const x = await api('sleep_time', data);
    return x;
  }