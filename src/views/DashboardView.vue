<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SidebarNav from '@/components/SidebarNav.vue'
import HabitCard from '@/components/HabitCard.vue'
import AddHabitModal from '@/components/AddHabitModal.vue'
import ProgressUpdateModal from '@/components/ProgressUpdateModal.vue'
import TypewriterText from '@/components/TypewriterText.vue'
import { getIslamicDate, getGregorianDate } from '@/utils/date'
import { aiService } from '@/services/ai.service'

import { habitService } from '@/services/habit.service'

const habits = ref([
  { id: '1', habit: 'Fajr Prayer', category: 'Morning Devotion', time: '05:15 AM', target: '1', actual: '1', progress: 100, icon: 'wb_sunny', completed: true, unit: 'Kali' },
  { id: '2', habit: 'Read Quran', category: 'Spiritual Knowledge', time: '10 Pages', target: '10', actual: '4', progress: 40, icon: 'auto_stories', unit: 'Halaman' },
  { id: '3', habit: 'Morning Dhikr', category: 'Mindfulness', time: '15 Mins', target: '15', actual: '15', progress: 100, icon: 'self_improvement', completed: true, unit: 'Menit' },
  { id: '4', habit: 'Physical Well-being', category: 'Body Stewardship', time: '45 Mins Gym', target: '45', actual: '0', progress: 0, icon: 'fitness_center', unit: 'Menit' }
])

const gregorianDate = ref(getGregorianDate())
const islamicDate = ref(getIslamicDate())
const username = ref('Omar Al-Sayed')

const isAddHabitModalOpen = ref(false)
const isProgressModalOpen = ref(false)
const isSidebarOpen = ref(false)
const selectedHabit = ref<any>(null)

const motivationQuote = ref("")
const isRefiningQuote = ref(false)

onMounted(() => {
  aiService.streamMotivation((text) => {
    motivationQuote.value = text
  })
})

const openAddHabit = () => {
  isAddHabitModalOpen.value = true
}

const openProgressUpdate = (habit: any) => {
  selectedHabit.value = habit
  isProgressModalOpen.value = true
}

const handleSaveHabit = (newHabit: any) => {
  habits.value.push({
    id: Date.now().toString(),
    habit: newHabit.name,
    category: 'Custom Habit',
    time: `${newHabit.totalTarget} ${newHabit.targetUnit}`,
    target: newHabit.totalTarget.toString(),
    actual: '0',
    progress: 0,
    icon: 'star',
    completed: false,
    unit: newHabit.targetUnit
  })
}

const handleUpdateProgress = async (val: number) => {
  if (!selectedHabit.value) return
  
  try {
    const response = await habitService.updateProgress(selectedHabit.value.id, val)
    
    // Update local state from response
    const h = habits.value.find(h => h.id === selectedHabit.value.id)
    if (h) {
      h.actual = response.plan.actualValue.toString()
      const target = parseFloat(h.target)
      h.progress = Math.min(100, Math.round((response.plan.actualValue / target) * 100))
      h.completed = response.plan.isCompleted
    }

    // Update motivation from AI feedback
    if (response.motivation) {
      motivationQuote.value = response.motivation
    }
  } catch (error) {
    console.error('Failed to update progress:', error)
  }
}

const handleReflect = () => {
  isRefiningQuote.value = true
  // Mock refreshing quote
  setTimeout(() => {
    isRefiningQuote.value = false
    motivationQuote.value = "He who follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise. Every step you take in discipline is a step towards excellence."
  }, 1000)
}
</script>

<template>
  <div class="flex h-screen bg-background-dark overflow-hidden relative">
    <!-- Sidebar -->
    <SidebarNav 
      :is-open="isSidebarOpen" 
      @close="isSidebarOpen = false"
      @new-habit="openAddHabit" 
    />

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto lg:p-8 p-4 islamic-pattern">
      <!-- Mobile Top Bar -->
      <div class="lg:hidden flex items-center justify-between p-4 bg-surface-dark/80 backdrop-blur-md border-b border-white/5 -mx-4 -mt-4 mb-6">
        <div class="flex items-center gap-3">
          <button 
            @click="isSidebarOpen = true"
            class="size-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-300 active:scale-95 transition-transform"
          >
            <span class="material-symbols-outlined">menu</span>
          </button>
          <h1 class="text-lg font-black tracking-tight text-white uppercase">Dashboard</h1>
        </div>
        <div class="text-right">
          <p class="text-[10px] text-gold font-bold uppercase tracking-widest">{{ islamicDate.split(' ')[0] }} {{ islamicDate.split(' ')[1] }}</p>
        </div>
      </div>

      <div class="max-w-5xl mx-auto space-y-6 lg:space-y-10">
        <!-- Top Header: Greeting + Islamic Date (Hidden on mobile top bar handled above for layout, but keeping for desktop) -->
        <header class="hidden lg:flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="text-3xl font-black tracking-tight text-white capitalize">Assalamu Alaykum, {{ username.split(' ')[0] }}</h1>
            <p class="text-slate-500 font-medium mt-1">Ready to elevate your character today?</p>
          </div>
          <div class="text-right">
            <p class="text-gold font-bold tracking-widest text-xs uppercase">{{ islamicDate }}</p>
            <p class="text-slate-400 text-sm font-medium">{{ gregorianDate }}</p>
          </div>
        </header>

        <!-- Mobile Greeting (Show only on mobile) -->
        <div class="lg:hidden">
          <h1 class="text-2xl font-black text-white">Marhaban, {{ username.split(' ')[0] }}</h1>
          <p class="text-slate-500 text-sm font-medium mt-1">Peace be upon you today.</p>
        </div>

        <!-- AI Motivation Header -->
        <section>
          <div class="gold-border-gradient rounded-2xl lg:p-8 p-6 relative overflow-hidden shadow-2xl">
            <div class="absolute top-0 right-0 p-8 opacity-10 hidden lg:block">
              <span class="material-symbols-outlined text-[120px] text-gold">auto_awesome</span>
            </div>
            <div class="relative z-10 space-y-4">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-gold animate-pulse">auto_awesome</span>
                <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-gold/80">Divine Inspiration • AI Generated</span>
              </div>
              <div class="max-w-2xl min-h-[80px] lg:min-h-[100px]">
                <h1 class="text-xl lg:text-3xl font-light italic leading-relaxed text-slate-100">
                  <TypewriterText v-if="!isRefiningQuote" :text="motivationQuote" />
                  <span v-else class="animate-pulse">Refining divine reflections...</span>
                </h1>
                <p class="mt-4 text-slate-400 text-xs lg:text-sm">— Surah Ash-Sharh [94:6] • Reflections for Omar</p>
              </div>
              <div class="pt-2 lg:pt-4 flex flex-wrap gap-3 lg:gap-4">
                <button 
                  @click="handleReflect"
                  :disabled="isRefiningQuote"
                  class="flex-1 lg:flex-none px-6 py-2.5 bg-gold/10 text-white border border-gold/30 rounded-full text-[10px] lg:text-xs font-bold hover:bg-gold hover:text-surface-dark transition-all uppercase tracking-widest disabled:opacity-50"
                >
                  {{ isRefiningQuote ? 'Refining...' : 'Reflect Deeply' }}
                </button>
                <button class="flex-1 lg:flex-none px-6 py-2.5 bg-white/5 text-slate-300 rounded-full text-[10px] lg:text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest">Share Verse</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Today's Habits Section -->
        <section class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl lg:text-2xl font-bold tracking-tight text-white">Today's Discipline</h2>
              <p class="text-slate-500 text-xs lg:text-sm">{{ gregorianDate }}</p>
            </div>
            <div class="flex items-center justify-between sm:justify-start gap-2 text-xs lg:text-sm bg-surface-dark px-4 py-2.5 rounded-xl border border-emerald-900/30">
              <span class="text-slate-400 font-medium">Daily Completion:</span>
              <span class="text-primary font-bold">{{ habits.filter(h => h.completed).length }} / {{ habits.length }}</span>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HabitCard 
              v-for="h in habits" 
              :key="h.habit" 
              v-bind="h" 
              @open-update="openProgressUpdate(h)"
            />
          </div>
        </section>
      </div>
    </main>

    <!-- Floating Quick Log -->
    <div class="fixed bottom-8 right-8">
      <button 
        @click="openAddHabit"
        class="size-14 bg-gold shadow-[0_10px_30px_rgba(212,175,55,0.4)] text-background-dark rounded-full flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <span class="material-symbols-outlined text-3xl font-bold group-hover:rotate-90 transition-transform">add</span>
      </button>
    </div>

    <!-- Modals -->
    <AddHabitModal 
      :is-open="isAddHabitModalOpen" 
      @close="isAddHabitModalOpen = false" 
      @save="handleSaveHabit"
    />

    <ProgressUpdateModal 
      v-if="selectedHabit"
      :is-open="isProgressModalOpen"
      :habit-name="selectedHabit.habit"
      :current-value="parseFloat(selectedHabit.actual)"
      :target-value="parseFloat(selectedHabit.target)"
      :unit="selectedHabit.unit"
      @close="isProgressModalOpen = false"
      @update="handleUpdateProgress"
    />
  </div>
</template>
