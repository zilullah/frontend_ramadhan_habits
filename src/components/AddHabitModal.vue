<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'save'])

const habitName = ref('')
const targetValue = ref(0)
const targetUnit = ref('Juz')
const durationDays = ref(30)
const startDate = ref(new Date().toISOString().split('T')[0])

const units = ['Juz', 'Halaman', 'Menit', 'Rakaat', 'Kali']

const close = () => {
  emit('close')
}

const save = () => {
  emit('save', {
    name: habitName.value,
    totalTarget: targetValue.value,
    targetUnit: targetUnit.value,
    durationDays: durationDays.value,
    startDate: startDate.value
  })
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
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="close"></div>
      
      <!-- Modal Content -->
      <div class="relative w-full max-w-lg bg-surface-dark border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div class="gold-border-gradient rounded-3xl p-8 space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-black tracking-tight text-white uppercase">New Discipline</h2>
            <button @click="close" class="text-slate-500 hover:text-white transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <form @submit.prevent="save" class="space-y-6">
            <div class="space-y-2">
              <label class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">Habit Name</label>
              <input 
                v-model="habitName"
                type="text" 
                placeholder="e.g., Membaca Al-Qur'an"
                class="w-full bg-black/20 border border-white/10 rounded-xl py-4 px-6 text-white placeholder:text-slate-700 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                required
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">Daily Target</label>
                <input 
                  v-model="targetValue"
                  type="number" 
                  step="0.1"
                  class="w-full bg-black/20 border border-white/10 rounded-xl py-4 px-6 text-white placeholder:text-slate-700 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">Unit</label>
                <select 
                  v-model="targetUnit"
                  class="w-full bg-black/20 border border-white/10 rounded-xl py-4 px-6 text-white appearance-none focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                >
                  <option v-for="unit in units" :key="unit" :value="unit" class="bg-surface-dark">{{ unit }}</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">Duration (Days)</label>
                <input 
                  v-model="durationDays"
                  type="number"
                  class="w-full bg-black/20 border border-white/10 rounded-xl py-4 px-6 text-white placeholder:text-slate-700 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">Start Date</label>
                <input 
                  v-model="startDate"
                  type="date"
                  class="w-full bg-black/20 border border-white/10 rounded-xl py-4 px-6 text-white placeholder:text-slate-700 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                  required
                />
              </div>
            </div>

            <button type="submit" class="w-full bg-gold hover:bg-gold/90 text-background-dark font-black py-4 rounded-xl tracking-[0.2em] uppercase text-sm shadow-xl shadow-gold/10 transform active:scale-[0.98] transition-all">
              Initialize Habit
            </button>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>
