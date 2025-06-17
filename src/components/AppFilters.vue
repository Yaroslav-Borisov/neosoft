<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import type { Filter } from '../types/Filter';
import type { RootState } from '../store';

const store = useStore<RootState>();
const filters = ref<Filter[]>(['All', 'Active', 'Done']);
const activeFilter = computed(() => store.getters.currentActiveFilter);

const changeFilter = (filter: Filter) => {
  store.dispatch('setFilter', filter);
};
</script>

<template>
  <aside class="app-filters">
    <section class="toggle-group">
      <button
        v-for="filter in filters"
        :key="filter"
        class="button"
        :class="{ 'button--primary': activeFilter === filter }"
        @click="changeFilter(filter)"
      >
        {{ filter }}
      </button>
    </section>
  </aside>
</template>
