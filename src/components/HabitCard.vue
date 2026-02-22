<script setup lang="ts">
defineProps<{
  habit: string
  category: string
  time?: string
  target: string
  actual: string
  progress: number
  icon: string
  completed?: boolean
}>()
const emit = defineEmits(['open-update'])
</script>

<template>
  <div class="bg-surface-dark border border-emerald-900/30 p-5 rounded-2xl flex flex-col justify-between hover:border-primary/40 transition-all group">
    <div class="flex justify-between items-start mb-6">
      <div class="flex gap-4">
        <div class="size-12 rounded-xl bg-accent-emerald flex items-center justify-center text-primary">
          <span class="material-symbols-outlined text-2xl">{{ icon }}</span>
        </div>
        <div>
          <h3 class="font-bold group-hover:text-primary transition-colors text-white">{{ habit }}</h3>
          <p class="text-xs text-slate-500">{{ category }} • {{ time }}</p>
        </div>
      </div>
      <div v-if="completed" class="flex gap-2">
        <div class="bg-primary/20 text-primary p-1 rounded-full h-fit">
          <span class="material-symbols-outlined text-sm font-bold">check</span>
        </div>
        <button @click="$emit('open-update')" class="bg-white/5 text-slate-400 p-1 rounded-full hover:bg-white/10 transition-all h-fit">
          <span class="material-symbols-outlined text-sm font-bold">edit</span>
        </button>
      </div>
      <button v-else @click="$emit('open-update')" class="bg-emerald-900/20 text-slate-500 p-1 rounded-full hover:bg-primary hover:text-background-dark transition-all h-fit">
        <span class="material-symbols-outlined text-sm font-bold">add</span>
      </button>
    </div>
    <div class="space-y-2">
      <div class="flex justify-between text-xs font-bold mb-1">
        <span class="text-slate-400">Actual: {{ actual }}</span>
        <span class="text-gold">Target: {{ target }}</span>
      </div>
      <div class="relative h-2.5 w-full bg-emerald-900/30 rounded-full overflow-hidden">
        <div class="absolute top-0 left-0 h-full bg-primary/20" :style="{ width: '100%' }"></div>
        <div class="h-full bg-primary rounded-full transition-all duration-500" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>
