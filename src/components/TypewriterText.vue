<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  text: string
  speed?: number
  delay?: number
}>()

const displayedText = ref('')
const isComplete = ref(false)

const startTypewriter = async () => {
  displayedText.value = ''
  isComplete.value = false
  
  if (props.delay) {
    await new Promise(resolve => setTimeout(resolve, props.delay))
  }

  const chars = props.text.split('')
  for (let i = 0; i < chars.length; i++) {
    displayedText.value += chars[i]
    await new Promise(resolve => setTimeout(resolve, props.speed || 30))
  }
  isComplete.value = true
}

onMounted(() => {
  startTypewriter()
})

watch(() => props.text, () => {
  startTypewriter()
})
</script>

<template>
  <span>
    {{ displayedText }}<span v-if="!isComplete" class="inline-block w-1.5 h-6 bg-gold ml-1 animate-pulse align-middle"></span>
  </span>
</template>
