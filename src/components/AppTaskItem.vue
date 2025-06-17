<script lang="ts" setup>
import { useStore } from 'vuex';
import type { PropType } from 'vue';
import type { Task } from '../types/Task';
import type { RootState } from '../store';

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
});

const store = useStore<RootState>();

const toggleTask = () => {
  store.dispatch('toggleTaskStatus', props.task.id);
};

const removeTask = () => {
  store.dispatch('deleteTask', props.task.id);
};
</script>

<template>
  <li class="task-item" :class="{ 'task-item--done': props.task.completed }" @click="toggleTask">
    <div class="task-item__status">
      <i class="bi bi-check2"></i>
    </div>
    <span class="task-item__text">{{ props.task.title }}</span>
    <button class="task-item__remove-button" @click.stop="removeTask">
      <i class="bi bi-trash3"></i>
    </button>
  </li>
</template>
