import type { NormalizedButtons, NormalizedFields, NormalizedSettings, NormalizedTitles, RawSetting, RawTitle } from '@/forms/core'

export interface UseForm<T, U> {
  id: symbol
  fields: NormalizedFields<T>
  buttons: NormalizedButtons<U>
  titles: NormalizedTitles
  settings: NormalizedSettings
}

export interface Args<T, U> {
  fields: T
  id?: string
  titles?: RawTitle
  buttons?: U
  settings?: RawSetting
}
