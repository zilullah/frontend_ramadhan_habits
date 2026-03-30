import api from './api.service'

export interface Plan {
  id: string
  date: string
  targetValue: number
  actualValue: number
  isCompleted: boolean
}

export interface Habit {
  id: string
  name: string
  plans: Plan[]
}

export interface ProgressResponse {
  plan: {
    id: string
    actualValue: number
    isCompleted: boolean
    targetValue: number
  }
  motivation: string | null
}

export const habitService = {
  async getTodayHabits(): Promise<Habit[]> {
    const { data } = await api.get('/habits/today')
    return data
  },

  async createHabit(habit: {
    name: string
    totalTarget: number
    targetUnit: string
    durationDays: number
    startDate: string
  }) {
    const { data } = await api.post('/habits', habit)
    return data
  },

  async updateProgress(planId: string, actualValue: number): Promise<ProgressResponse> {
    const { data } = await api.post('/progress', { planId, actualValue })
    return data
  }
}
