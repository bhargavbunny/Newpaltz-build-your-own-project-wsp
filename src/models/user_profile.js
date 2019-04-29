import { api } from './api';

export async function addprofile(data) {
    const x = await api('user_profile', data);
    return x;
  }
export async function updateprofile(data) {
    const x = await api('user_profile', data);
    return x;
  }
