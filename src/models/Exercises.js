
import { api } from './api';

export async function getExercise() {
  const x = await api('Exercises');
  return x;
}

export async function addExercise(data) {
  const x = await api('Exercises', data);
  return x;
}

export async function get(data) {
  const x = await api('Exercises/getID', data);
  return x;
}
export async function updateExercise(data) {
  const x = await api('Exercises/getID', data);
  return x;
}