<script setup lang="ts">
defineProps<{
  isOpen: boolean
  username?: string
}>()

const emit = defineEmits(['new-habit', 'close', 'logout'])
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
              <h2 class="text-sm font-bold tracking-wide text-white">{{ username || 'Ibadurrahman' }}</h2>
              <p class="text-xs text-primary font-medium italic">Active Journey</p>
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
        <button 
          @click="emit('new-habit')"
          class="w-full flex items-center justify-center gap-2 py-3 bg-primary text-background-dark font-bold rounded-xl hover:opacity-90 transition-all mb-2"
        >
          <span class="material-symbols-outlined">add</span>
          <span class="text-sm">New Habit</span>
        </button>

        <button 
          @click="emit('logout')"
          class="w-full flex items-center justify-center gap-2 py-3 bg-white/5 text-slate-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 border border-white/5 transition-all text-sm font-bold rounded-xl"
        >
          <span class="material-symbols-outlined text-sm">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </aside>
</template>
