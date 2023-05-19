import type { NormalizedField } from '@/forms/core'

export function useErrorStyles(field: NormalizedField) {
  const state = reactive({
    borderColor: '',
    textColor: '',
  })

  watch(() => field.errors, () => {
    const borderColor = field.errors.length ? 'border border-red-500 focus:ring-red-500 focus:border-red-500' : 'border border-gray-300'
    const textColor = field.errors.length ? 'text-red-500' : ''

    Object.assign(state, {
      borderColor,
      textColor,
    })
  })

  return state
}