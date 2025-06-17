import { createStore } from 'vuex';
import type { Commit } from 'vuex';
import type { Task } from '../types/Task';
import type { Filter } from '../types/Filter';

import { getTasks, addTask, updateTask, deleteTask } from '../api/tasksApi';

export interface RootState {
    tasks: Task[];
    activeFilter: Filter;
    isLoading: boolean;
    error: string | null;
}

export default createStore<RootState>({
    state: {
        tasks: [],
        activeFilter: 'All',
        isLoading: false,
        error: null,
    },
    getters: {
        allTasks: (state: RootState) => state.tasks,

        activeTasks: (state: RootState) => state.tasks.filter((task) => !task.completed),

        doneTasks: (state: RootState) => state.tasks.filter((task) => task.completed),

        filteredTasks: (state: RootState, getters: any) => {
            switch (state.activeFilter) {
                case 'Active':
                    return getters.activeTasks;
                case 'Done':
                    return getters.doneTasks;
                case 'All':
                default:
                    return getters.allTasks;
            }
        },

        tasksStats: (state: RootState, getters: any) => ({ // Добавили state
            activeTasksCount: getters.activeTasks.length,
            doneTasksCount: getters.doneTasks.length,
        }),

        currentActiveFilter: (state: RootState) => state.activeFilter,
        isLoading: (state: RootState) => state.isLoading,
        error: (state: RootState) => state.error,
    },
    mutations: {
        SET_LOADING(state: RootState, isLoading: boolean) {
            state.isLoading = isLoading;
        },

        SET_ERROR(state: RootState, error: string | null) {
            state.error = error;
        },

        SET_TASKS(state: RootState, tasks: Task[]) {
            state.tasks = tasks;
        },

        ADD_TASK(state: RootState, task: Task) {
            state.tasks.push(task);
        },

        UPDATE_TASK(state: RootState, updatedTask: Task) {
            const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
            if (index !== -1) {
                state.tasks.splice(index, 1, updatedTask);
            }
        },

        REMOVE_TASK(state: RootState, id: number) {
            state.tasks = state.tasks.filter((t) => t.id !== id);
        },

        changeFilter(state: RootState, filter: Filter) {
            state.activeFilter = filter;
        },
    },
    actions: {
        async fetchTasks({ commit }: { commit: Commit }) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
            try {
                const tasks = await getTasks();
                commit('SET_TASKS', tasks);
            } catch (error: any) {
                commit('SET_ERROR', error.message || 'Не удалось загрузить задачи');
            } finally {
                commit('SET_LOADING', false);
            }
        },

        async addNewTask({ commit }: { commit: Commit }, title: string) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
            try {
                const newTask = await addTask({ title, completed: false });
                commit('ADD_TASK', newTask);
            } catch (error: any) {
                commit('SET_ERROR', error.message || 'Не удалось добавить задачу');
            } finally {
                commit('SET_LOADING', false);
            }
        },

        async toggleTaskStatus({ commit, state }: { commit: Commit; state: RootState }, id: number) {
            const taskToUpdate = state.tasks.find(t => t.id === id);
            if (!taskToUpdate) {
                commit('SET_ERROR', `Задача с ID ${id} не найдена.`);
                return;
            }

            const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
            try {
                await updateTask(updatedTask);
                commit('UPDATE_TASK', updatedTask);
            } catch (error: any) {
                commit('SET_ERROR', error.message || `Не удалось обновить задачу с ID ${id}`);
            } finally {
                commit('SET_LOADING', false);
            }
        },

        async deleteTask({ commit }: { commit: Commit }, id: number) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
            try {
                await deleteTask(id);
                commit('REMOVE_TASK', id);
            } catch (error: any) {
                commit('SET_ERROR', error.message || `Не удалось удалить задачу с ID ${id}`);
            } finally {
                commit('SET_LOADING', false);
            }
        },

        setFilter({ commit }: { commit: Commit }, filter: Filter) {
            commit('changeFilter', filter);
        }
    },
});