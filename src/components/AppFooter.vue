<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import type { TaskStats } from '../types/TaskStats';
import type { RootState } from '../store';

const store = useStore<RootState>();
const tasksStats = computed<TaskStats>(() => store.getters.tasksStats);
</script>

<template>
  <footer class="app-footer">
    {{ tasksStats?.activeTasksCount ?? 0 }} more to do, {{ tasksStats?.doneTasksCount ?? 0 }} done
  </footer>
</template>
