import { h } from "tsx-dom"

import { Form } from "@/core"
import { ControlsContainer, GeneralMessageError } from "@/core"
import { FormModes } from "../form"
import { defineComponent } from "../pseudo"
import { html } from "uhtml"

interface FMainAttributes {
  form: Form
  slots?: {
    [k: string]: any
  }
}

export const FFormMain = ({ form, slots }: FMainAttributes) =>
  defineComponent(() => {
    const isCreateMode = form.settings.mode === FormModes.CREATE_MODE
    const filteredFields = Object.entries(form.fields).filter(([, field]) => {
      if (field.hidden) return false

      if (isCreateMode && !field.updateOnly) return true
      if (!isCreateMode && !field.createOnly) return true

      return false
    })

    const inputs = filteredFields.map(([fieldKey, field]) => {
      const hasBeforeField = slots && slots[`before-${fieldKey}`]
      const hasAfterField = slots && slots[`after-${fieldKey}`]

      const BeforeField = hasBeforeField ? slots[`before-${fieldKey}`] : () => undefined
      const AfterField = hasAfterField ? slots[`after-${fieldKey}`] : () => undefined

      const ControlGenerator = field.RenderField
      const input = <ControlGenerator field={field} fieldKey={fieldKey} {...field} />

      const controlContainer = [<BeforeField />, input, <AfterField />]

      field.ref = input

      return controlContainer
    })

    // const messageError = form.generalError ? <GeneralMessageError></GeneralMessageError> : undefined

    const controlsContainer = (
      <ControlsContainer>
        {inputs}
        {/* {messageError} */}
      </ControlsContainer>
    )

    return () => html` ${controlsContainer} `
  })