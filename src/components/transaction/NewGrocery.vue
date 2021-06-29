<template>
  <div class="mt-5">
    <div class="row mb-5">
      <div class="col-lg-10">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Action Control
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div class="form-group">
                  <label for="">Item</label>
                  <input type="text" class="form-control" v-model="form.item" />
                </div>
                <div class="form-group">
                  <label for="">Quantity</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="form.count"
                  />
                </div>
                <div class="form-group">
                  <label for="">Price</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="form.price"
                  />
                </div>
                <div class="form-group mt-2">
                  <button class="btn btn-primary" @click="addItem">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2>My Grocery List</h2>
    <hr />
    <div class="row">
      <div class="col-lg-10">
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item"
            v-for="(grocery, index) in groceries"
            :key="'g' + index"
          >
            <span
              ><button type="button" class="btn btn-primary" @click="removeItem(grocery)">
                <span>
                  <i class="far fa-trash-alt"></i>
                </span>
              </button></span
            >
            {{ grocery.count }} X {{ grocery.item }} @{{ grocery.price }}= {{ grocery.total }}
          </li>
        </ul>
        <hr />
        Total is <strong>{{ total }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
export default {
  setup () {
    const form = ref({
      item: '',
      count: 0,
      price: 0,
      total: 0
    })

    const groceries = ref([])

    const total = computed(() => {
      let x = 0
      groceries.value.forEach((el) => {
        x += parseFloat(el.total)
      })

      return x
    })

    const addItem = async () => {
      form.value.total =
        parseFloat(form.value.count) * parseFloat(form.value.price)
      groceries.value.push(form.value)
      form.value = {
        item: '',
        count: 0,
        price: 0,
        total: 0
      }
    }

    const removeItem = async (groceryItem) => {
      const index = groceries.value.findIndex(
        (el) => el.item === groceryItem.item
      )
      groceries.value.splice(index, 1)
    }

    return { form, groceries, total, addItem, removeItem }
  }
}
</script>

<style>
</style>
