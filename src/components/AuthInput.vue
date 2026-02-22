<script setup lang="ts">
defineProps<{
  label: string
  modelValue: string
  type?: string
  placeholder?: string
  icon: string
  showForgot?: boolean
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="space-y-3">
    <div class="flex justify-between items-center px-1">
      <label class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">{{ label }}</label>
      <a v-if="showForgot" class="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-colors" href="#">Forgot?</a>
    </div>
    <div class="relative group">
      <span class="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">{{ icon }}</span>
      <input 
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :type="type || 'text'"
        class="w-full bg-black/20 border border-white/10 rounded-xl py-5 pl-14 pr-4 text-white placeholder:text-slate-700 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" 
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
