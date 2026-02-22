<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const handleSocialLogin = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <button 
      @click="handleSocialLogin"
      class="flex items-center justify-center gap-3 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
    >
      <img alt="Google" class="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYx4jcB5EuZO39NW3_RzfxWOI3gwMXrfOUexvjZxy-QpEYFsmfFnT1kkeqOGJuTT8rmDgA_GoI1-8k0JmihghqsFrPSQPfaYP-70rpE54Ef7UfOUtp6RylxV83RcJTWMgzHlynoLRUI8mCDyCPhQyZ2k3V2iDbxypxkw5_vMYfOWOpZjF2c4qn3r7xpQe0pnnR54XrR2go9640epqyH47cNgbliR7enngpSLwuOWpDfTCRAPUzcFU_9qG9q_5bYuFiffuFhbQxZQHp"/>
      <span class="text-[11px] font-black tracking-widest text-slate-100 uppercase">Google</span>
    </button>
    <button 
      @click="handleSocialLogin"
      class="flex items-center justify-center gap-3 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
    >
      <img alt="Apple" class="w-5 h-5 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwpLiIFv4MYq6vPGbnT7xqSlyt7cMb5nYPer_4BYukyvPjkO1nM4NJiT5U1gQR5Ry_TLO1bFR4Srmre6MuqGc2Hc9op7sLSPB10BNiwA2JGAUYytj3ZtzFQn3jTlejyeGyg8ADPk4ezHC5HOcLJS6T8ci9WFUncht13jg9L1gUw2uEoZfDqic5COxMp_9_tmoIw4oNof2QN8GskC2FFmOXTTARwt894ihHqlZtVZb8XVZkyzHnaoRtbdzzBZp2ymW2DhAJnKdfrVA1"/>
      <span class="text-[11px] font-black tracking-widest text-slate-100 uppercase">Apple</span>
    </button>
  </div>
</template>
