import api from './api.service'

export const aiService = {
  streamMotivation(callback: (text: string) => void) {
    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/ai/motivation/stream`)
    
    eventSource.onmessage = (event) => {
      callback(event.data)
    }

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error)
      eventSource.close()
    }

    return () => eventSource.close()
  },

  async getMotivation(): Promise<string> {
    const { data } = await api.get('/ai/motivation')
    return data
  }
}
