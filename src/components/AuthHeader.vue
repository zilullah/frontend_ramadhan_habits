<template>
  <header class="relative z-10 flex items-center justify-between px-6 lg:px-20 py-8">
    <div class="flex items-center gap-3">
      <div class="size-9 bg-primary rounded-lg flex items-center justify-center text-background-dark">
        <span class="material-symbols-outlined text-2xl font-bold">star</span>
      </div>
      <h2 class="text-xl font-bold tracking-tight text-white">Al-Murid</h2>
    </div>
    
    <nav class="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
      <a class="text-sm font-semibold text-slate-300 hover:text-primary transition-colors" href="#">Our Vision</a>
      <a class="text-sm font-semibold text-slate-300 hover:text-primary transition-colors" href="#">Journey</a>
      <a class="text-sm font-semibold text-slate-300 hover:text-primary transition-colors" href="#">Support</a>
    </nav>

    <div class="flex items-center gap-6">
      <button class="hidden sm:block text-sm font-bold text-primary hover:text-primary/80 transition-colors">English (EN)</button>
      <div class="h-6 w-[1px] bg-slate-800 hidden sm:block"></div>
      <button class="text-slate-300 hover:text-primary transition-colors">
        <span class="material-symbols-outlined">language</span>
      </button>
    </div>
  </header>
</template>
