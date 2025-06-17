<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex'; // Импортируем useStore
import type { RootState } from '../store'; // Импортируем RootState

const store = useStore<RootState>(); // Инициализируем store через useStore

const isFormVisible = ref(false);
const taskText = ref('');

const showForm = () => {
  isFormVisible.value = true;
};

const hideForm = () => {
  isFormVisible.value = false;
};

const addTask = () => {
  // Проверяем, что поле ввода не пустое перед отправкой
  if (taskText.value.trim()) {
    store.dispatch('addNewTask', taskText.value); // Передаем .value для ref
    taskText.value = ''; // Очищаем поле после добавления
    hideForm(); // Скрываем форму после добавления
  }
};
</script>

<template>
  <section class="add-task">
    <form v-if="isFormVisible" class="add-task__form" @submit.prevent="addTask">
      <button class="close-button" type="button" @click="hideForm">
        <i class="bi bi-x"></i>
      </button>
      <div class="text-input text-input--focus">
        <input class="input" v-model="taskText" />
      </div>
      <button class="button button--filled">Add task</button>
    </form>
    <button v-else class="add-task__show-form-button" @click="showForm">
      <i class="bi bi-plus-lg"></i>
    </button>
  </section>
</template>
