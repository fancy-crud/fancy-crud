import { useFormManager } from './manager'
import type { NormalizedButtons, NormalizedFields, NormalizedSettings, NormalizedTitles, ObjectWithRawField, RawButton, RawSetting, RawTitle } from '@/forms/core'
import { CreateForm } from '@/forms/foundation'

interface UseForm<T, U> {
  id: symbol
  fields: NormalizedFields<T>
  buttons: NormalizedButtons<U>
  titles: NormalizedTitles
  settings: NormalizedSettings
}

interface Args<T, U> {
  fields: T
  id?: string
  titles?: RawTitle
  buttons?: U
  settings?: RawSetting
}

/**
 * A function that provides functionality to create a reactive form object from raw fields, titles, buttons, and settings.
 *
 * @typeparam T - A generic type parameter that extends `ObjectWithRawField`.
 * @typeparam U - A generic type parameter that extends `Record<string, RawButton>`.
 * @param rawFields - A `ObjectWithRawField` object containing the raw fields to be normalized.
 * @param rawTitles - An optional `RawTitle` object containing the raw titles to be normalized.
 * @param rawButtons - An optional `Record<string, RawButton>` object containing the raw buttons to be normalized.
 * @param rawSettings - An optional `RawSettings` object containing the raw settings to be normalized.
 * @returns A `UseForm` object containing the reactive fields, titles, buttons, and settings.
 */
export function useForm<T extends ObjectWithRawField, U extends Record<string, RawButton>>(args: Args<T, U>): UseForm<T, U> {
  const {
    id: _id,
    fields: rawFields,
    titles: rawTitles,
    buttons: rawButtons,
    settings: rawSettings,
  } = args

  const id = Symbol(_id)

  const {
    originalNormalizedFields,
    clonedNormalizedFields,
    normalizedTitles,
    normalizedButtons,
    normalizedSettings,
  } = new CreateForm().execute(rawFields, rawTitles, rawButtons, rawSettings)

  const fields = reactive(clonedNormalizedFields) as NormalizedFields<T>
  const buttons = reactive(normalizedButtons) as NormalizedButtons<U>
  const titles = reactive(normalizedTitles)
  const settings = reactive(normalizedSettings)

  useFormManager(id).addForm({
    originalNormalizedFields,
    fields,
    titles,
    settings,
  })

  return {
    id,
    fields,
    titles,
    buttons,
    settings,
  }
}