<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthHeader from '@/components/AuthHeader.vue'
import SocialAuthButtons from '@/components/SocialAuthButtons.vue'
import AuthInput from '@/components/AuthInput.vue'
import AuthFooter from '@/components/AuthFooter.vue'
import { authService } from '@/services/auth.service'

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) return
  
  isLoading.value = true
  try {
    await authService.login({
      email: email.value,
      password: password.value
    })
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
    alert('Login failed. Please check your credentials.')
  } finally {
    isLoading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="fixed inset-0 islamic-pattern pointer-events-none opacity-20"></div>
  
  <AuthHeader />

  <!-- Main Content -->
  <main class="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
    <!-- Welcome Message -->
    <div class="text-center mb-12 space-y-4 max-w-2xl">
      <h4 class="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">As-Salamu Alaykum</h4>
      <h1 class="text-5xl md:text-6xl font-black tracking-tight text-white">
        Begin Your Growth
      </h1>
      <p class="text-primary/70 text-lg font-medium">Spiritual excellence through consistent, mindful habits.</p>
    </div>

    <!-- Auth Card -->
    <div class="w-full max-w-[480px] bg-[#0a1a10] rounded-2xl shadow-2xl border border-white/5 overflow-hidden">
      <!-- Auth Tabs -->
      <div class="flex border-b border-white/5">
        <button 
          class="flex-1 py-6 text-[13px] font-black tracking-widest border-b-2 border-primary text-primary transition-all"
        >
          SIGN IN
        </button>
        <button 
          @click="goToRegister"
          class="flex-1 py-6 text-[13px] font-black tracking-widest border-b-2 border-transparent text-slate-500 hover:text-slate-300 transition-all"
        >
          CREATE ACCOUNT
        </button>
      </div>

      <div class="p-10 space-y-8">
        <SocialAuthButtons />

        <div class="relative flex py-2 items-center">
          <div class="flex-grow border-t border-white/5"></div>
          <span class="flex-shrink mx-6 text-[10px] font-black text-slate-600 tracking-[0.2em] uppercase">Or email</span>
          <div class="flex-grow border-t border-white/5"></div>
        </div>

        <!-- Input Group -->
        <form class="space-y-6" @submit.prevent="handleLogin">
          <AuthInput 
            label="Email Address"
            v-model="email"
            type="email"
            placeholder="name@example.com"
            icon="mail"
          />

          <AuthInput 
            label="Password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            icon="lock"
            showForgot
          />

          <div class="flex items-center gap-3 px-1">
            <input 
              v-model="rememberMe"
              class="size-4 rounded border-white/10 bg-black/20 text-primary focus:ring-primary transition-all" 
              id="remember" 
              type="checkbox"
            />
            <label class="text-sm font-medium text-slate-500 cursor-pointer" for="remember">Keep me focused</label>
          </div>
          <button 
            :disabled="isLoading"
            class="w-full bg-gold hover:bg-gold/90 text-background-dark font-black py-5 rounded-xl tracking-[0.2em] uppercase text-sm shadow-xl shadow-gold/10 transform active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {{ isLoading ? 'Entering...' : 'Bismillah & Sign In' }}
          </button>
        </form>
      </div>

      <!-- Card Footer -->
      <div class="bg-primary/5 p-8 text-center border-t border-white/5">
        <p class="text-sm text-slate-500 italic font-medium">"Verily, with hardship comes ease."</p>
      </div>
    </div>

    <!-- Secondary Links -->
    <div class="mt-12 flex items-center gap-6">
      <a class="text-[11px] font-black tracking-[0.2em] text-slate-600 hover:text-primary transition-colors uppercase" href="#">Privacy</a>
      <div class="size-1 rounded-full bg-slate-800"></div>
      <a class="text-[11px] font-black tracking-[0.2em] text-slate-600 hover:text-primary transition-colors uppercase" href="#">Terms</a>
      <div class="size-1 rounded-full bg-slate-800"></div>
      <a class="text-[11px] font-black tracking-[0.2em] text-slate-600 hover:text-primary transition-colors uppercase" href="#">Guidelines</a>
    </div>
  </main>

  <AuthFooter />

  <!-- Visual Accents -->
  <div class="fixed top-1/4 -left-32 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none rounded-full"></div>
  <div class="fixed bottom-1/4 -right-32 w-96 h-96 bg-gold/5 blur-[120px] pointer-events-none rounded-full"></div>
</template>
