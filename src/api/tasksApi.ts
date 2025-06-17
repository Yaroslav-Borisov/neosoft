import type { Task } from '../types/Task';

let tasksData: Task[] = [
    { id: 0, title: 'Убраться дома', completed: true },
    { id: 1, title: 'Сделать дела на работе', completed: false },
    { id: 2, title: 'Погулять с собакой', completed: false },
];

const API_DELAY = 500;

export function getTasks(): Promise<Task[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...tasksData]);
        }, API_DELAY);
    });
}

export function addTask(newTask: Omit<Task, 'id'>): Promise<Task> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newId = tasksData.length > 0 ? Math.max(...tasksData.map(t => t.id)) + 1 : 0;
            const taskWithId: Task = { ...newTask, id: newId };
            tasksData.push(taskWithId);
            resolve(taskWithId);
        }, API_DELAY);
    });
}

export function updateTask(updatedTask: Task): Promise<Task> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = tasksData.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
                tasksData[index] = { ...updatedTask };
                resolve(tasksData[index]);
            } else {
                reject(new Error('Задача не найдена'));
            }
        }, API_DELAY);
    });
}

export function deleteTask(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const initialLength = tasksData.length;
            tasksData = tasksData.filter(t => t.id !== id);
            if (tasksData.length < initialLength) {
                resolve();
            } else {
                reject(new Error('Задача не найдена'));
            }
        }, API_DELAY);
    });
}