<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AppTaskItem from './AppTaskItem.vue';
import type { RootState } from '../store';

const store = useStore<RootState>();
const filteredTasks = computed(() => store.getters.filteredTasks);
</script>

<template>
  <ul class="task-list" v-if="filteredTasks?.length !== 0">
    <AppTaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
  </ul>
  <span class="task-list-empty" v-else>Здесь пока нет задач</span>
</template>
