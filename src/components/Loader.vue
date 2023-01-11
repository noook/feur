<template>
  <div class="flex gap-x-1">
    <div :class="color" class="w-2 h-2 rounded-full animate-bounce" />
    <div :class="color" class="w-2 h-2 rounded-full animate-bounce animation-delay-200" />
    <div :class="color" class="w-2 h-2 rounded-full animate-bounce animation-delay-400" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  color: string;
}>();
</script>
