export const aiService = {
  streamMotivation(callback: (text: string) => void) {
    // In a real implementation, this would use EventSource
    // const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/ai/motivation/stream`)
    // eventSource.onmessage = (event) => callback(event.data)
    // return () => eventSource.close()

    // Mock implementation for the typewriter/stream feel
    const fullText = "Verily, with hardship comes ease. Let your heart find tranquility in the remembrance of your Creator as you build your character today. Discipline is the bridge between goals and accomplishment."
    let currentText = ""
    let index = 0
    
    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index]
        callback(currentText)
        index++
      } else {
        clearInterval(interval)
      }
    }, 30)

    return () => clearInterval(interval)
  },

  async getMotivation() {
    // const { data } = await api.get('/ai/motivation')
    // return data
    return {
      text: "Every struggle is a form of worship if done with the right intention.",
      reference: "Hadith Reflection"
    }
  }
}
