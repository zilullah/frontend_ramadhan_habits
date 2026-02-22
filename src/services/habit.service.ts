import api from './api.service'

export interface Habit {
  id: string
  name: string
  totalTarget: number
  targetUnit: string
  durationDays: number
  startDate: string
  user?: any
  createdAt?: string
  updatedAt?: string
}

export interface HabitPlan {
  id: string
  habitId: string
  date: string
  targetValue: number
  actualValue: number
  isCompleted: boolean
  habit?: Habit
  createdAt?: string
  updatedAt?: string
}

export interface ProgressResponse {
  plan: HabitPlan
  motivation: string
}

export const habitService = {
  async getTodayHabits() {
    // const { data } = await api.get('/habits/today')
    // return data
    
    // Mock for now until backend is ready
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', habit: 'Fajr Prayer', category: 'Morning Devotion', time: '05:15 AM', target: '1', actual: '1', progress: 100, icon: 'wb_sunny', completed: true, unit: 'Kali' },
          { id: '2', habit: 'Read Quran', category: 'Spiritual Knowledge', time: '10 Pages', target: '10', actual: '4', progress: 40, icon: 'auto_stories', unit: 'Halaman' },
        ])
      }, 500)
    })
  },

  async createHabit(habit: any) {
    const { data } = await api.post('/habits', habit)
    return data
  },

  async updateProgress(habitId: string, actualValue: number): Promise<ProgressResponse> {
    // const { data } = await api.post('/progress', { habitId, actualValue })
    // return data
    
    // Mocking response based on user provided JSON
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          plan: {
            id: 'bcc66e8c-9a48-4c03-a917-c9ce2d39d8a4',
            habitId: habitId,
            date: new Date().toISOString().split('T')[0] || '',
            targetValue: 20.13,
            actualValue: actualValue,
            isCompleted: false,
            habit: {
              id: habitId,
              name: "Reading Quran",
              totalTarget: 604,
              targetUnit: "pages",
              durationDays: 30,
              startDate: "2026-02-22"
            }
          },
          motivation: "Tetap semangat! Allah mencintai amalan yang konsisten meskipun sedikit."
        })
      }, 500)
    })
  }
}
