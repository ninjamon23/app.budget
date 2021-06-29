<template>
    <div>
        <fieldset>
            <form @submit.prevent="callApi">
                <div class="form-group">
                    <label for="">Name</label>
                    <input type="text" class="form-control" v-model="form.name"/>
                </div>
                <div class="form-group">
                    <label for="">Amount</label>
                    <input type="text" class="form-control" v-model="form.amount"/>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        </fieldset>
    </div>
</template>

<script>
// use the APIs
import { submitForm } from '../../composable/submitForm.js'

export default {
  setup () {
    const { form, result, error, loading, callApi } = submitForm({ name: '', amount: 0, type: '' },
      async (formPayload) => {
        let formVal = localStorage.getItem('transactions')
        if (!formVal) {
          formVal = []
        } else {
          formVal = JSON.parse(formVal)
        }

        formVal.push(formPayload)
        localStorage.setItem('transactions', JSON.stringify(formVal))
        return true
      })
    return { form, result, error, loading, callApi }
  }
}
</script>
