<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { RootState } from './store';

import AppFilters from './components/AppFilters.vue';
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import AppTaskList from './components/AppTaskList.vue';
import AppTaskForm from './components/AppTaskForm.vue';

const store = useStore<RootState>();

const isLoading = computed<boolean>(() => store.getters.isLoading);
const error = computed<string | null>(() => store.getters.error);

onMounted(() => {
  store.dispatch('fetchTasks');
});
</script>

<template>
  <AppHeader />
  <AppFilters />
  <main class="app-main">
    <div v-if="isLoading" class="loading-message">Загрузка...</div>
    <div v-else-if="error" class="error-message">Ошибка: {{ error }}</div>
    <template v-else>
      <AppTaskList />
      <AppTaskForm />
    </template>
  </main>
  <AppFooter />
</template>
