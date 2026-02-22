<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['new-habit', 'close'])
</script>

<template>
  <!-- Mobile Backdrop -->
  <Transition
    enter-active-class="transition-opacity duration-300 ease-linear"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-linear"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
      @click="emit('close')"
    ></div>
  </Transition>

  <!-- Sidebar -->
  <aside 
    class="fixed inset-y-0 left-0 z-50 w-72 border-r border-emerald-900/30 bg-surface-dark flex flex-col h-screen transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto shrink-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="p-6 flex flex-col h-full justify-between">
      <div class="space-y-8">
        <!-- Profile Section -->
        <div class="flex items-center justify-between lg:block">
          <div class="flex items-center gap-4 group cursor-pointer">
            <div class="relative">
              <div class="size-12 rounded-full border-2 border-primary overflow-hidden">
                <img alt="Profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqUy3yUgFpVHS2wEb4eOW8ikyi2AkuWK34QLVnmi0ClK2E819VDr-PuoZRammEgDmLuly7gDJp3URQFEkMzJgZiX666bzAwqvGZsF9yvVWMev1M_MRp__D8AmanjnG0P57bHjtv1vq3dZwBLmrY2MfM1qRF4ULoe3mGrqLttMseJVtDWoVzNxlwrJrkQ2o1obX2AbAJUSfE6klwT80MouT9q3Xxd9gR2E74C3X56ZjASOjb7jPBdB4xtgwcFNAYW3vEMqd7gu67lkA"/>
              </div>
              <div class="absolute -bottom-1 -right-1 bg-gold rounded-full size-5 flex items-center justify-center border-2 border-surface-dark">
                <span class="material-symbols-outlined text-[12px] text-surface-dark font-bold">workspace_premium</span>
              </div>
            </div>
            <div class="flex flex-col">
              <h2 class="text-sm font-bold tracking-wide text-white">Omar Al-Sayed</h2>
              <p class="text-xs text-primary font-medium">15 Day Streak</p>
            </div>
          </div>
          <button 
            @click="emit('close')"
            class="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <!-- Navigation Links -->
        <nav class="space-y-2">
          <a class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 transition-all font-semibold text-sm" href="#">
            <span class="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
        </nav>
      </div>
      <!-- Bottom Actions -->
      <div class="space-y-4">
        <div class="p-4 rounded-2xl bg-accent-emerald/40 border border-emerald-800/50">
          <p class="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">Monthly Progress</p>
          <div class="flex justify-between items-end mb-1">
            <span class="text-2xl font-bold text-slate-100">84%</span>
            <span class="text-[10px] text-emerald-400">+12% from last week</span>
          </div>
          <div class="h-1.5 w-full bg-emerald-900 rounded-full overflow-hidden">
            <div class="h-full bg-primary" style="width: 84%;"></div>
          </div>
        </div>
        <button 
          @click="emit('new-habit')"
          class="w-full flex items-center justify-center gap-2 py-3 bg-primary text-background-dark font-bold rounded-xl hover:opacity-90 transition-all"
        >
          <span class="material-symbols-outlined">add</span>
          <span class="text-sm">New Habit</span>
        </button>
      </div>
    </div>
  </aside>
</template>
