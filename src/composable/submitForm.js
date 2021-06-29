import { ref } from '@vue/composition-api'

export function submitForm (formPayload, submit) {
  const form = ref(formPayload)
  const result = ref('')
  const error = ref(false)
  const loading = ref(false)

  const callApi = async () => {
    error.value = false
    loading.value = true
    try {
      result.value = await submit(form.value)
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  return { form, result, error, loading, callApi }
}
