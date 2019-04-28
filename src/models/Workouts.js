
import { api } from './api';

export async function getWorkouts() {
  const x = await api('Workouts');
  return x;
}

export async function addWorkouts(data) {
  const x = await api('Workouts', data);
  return x;
}

export async function get(data) {
  const x = await api('Workouts/getID', data); 
  return x;
}
export async function updateWorkouts(data) {
  const x = await api('Workouts', data);
  return x;
}