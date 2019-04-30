import { api } from './api';

export async function Food_List(){
    const x = await api("Daily_Food")
    return x;
}
export async function sleep_time(){
    const x = await api("sleep")
    return x;
}
export async function Exercise(){
    const x = await api("Exercise")
    return x;
}

