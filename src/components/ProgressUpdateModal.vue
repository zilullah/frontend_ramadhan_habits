<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
  habitName: string
  currentValue: number
  targetValue: number
  unit: string
}>()

const emit = defineEmits(['close', 'update'])

const newVal = ref(props.currentValue)

watch(() => props.currentValue, (v) => {
  newVal.value = v
})

const close = () => {
  emit('close')
}

const submit = () => {
  emit('update', newVal.value)
  close()
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="close"></div>
      
      <div class="relative w-full max-w-md bg-surface-dark border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div class="gold-border-gradient rounded-3xl p-8 space-y-6">
          <div class="text-center space-y-2">
            <h2 class="text-xl font-black tracking-tight text-white uppercase">{{ habitName }}</h2>
            <p class="text-slate-500 text-xs font-bold tracking-widest uppercase">Update Daily Progress</p>
          </div>

          <div class="space-y-8 py-4">
            <div class="text-center">
              <span class="text-5xl font-black text-primary">{{ newVal }}</span>
              <span class="text-slate-500 ml-2 font-bold uppercase tracking-widest text-xs">{{ unit }}</span>
            </div>

            <div class="space-y-4">
              <input 
                v-model.number="newVal"
                type="range"
                :min="0"
                :max="targetValue * 1.5"
                step="0.1"
                class="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div class="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-600">
                <span>0 {{ unit }}</span>
                <span class="text-gold">Target: {{ targetValue }} {{ unit }}</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button @click="close" class="py-4 rounded-xl border border-white/5 text-slate-400 font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all">Cancel</button>
            <button @click="submit" class="py-4 rounded-xl bg-primary text-background-dark font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20 hover:opacity-90 transition-all">Save Progress</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: white;
  border: 4px solid var(--color-primary);
  cursor: pointer;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
}
</style>
