<template>
  <section v-if="toyToEdit" class="toy-edit py-2">
    <form @submit.prevent="saveToy" class="form">
      <div class="form-control">
        <label for="txt" class="form-label">Toy Name</label>
        <input
          required
          v-model="toyToEdit.name"
          id="txt"
          type="text"
          class="form-input"
          placeholder="Enter your toy name here..."
        />
      </div>
      <div class="form-control">
        <label for="speed" class="form-label">Toy Price ($)</label>
        <input
          required
          v-model.number="toyToEdit.price"
          id="speed"
          type="number"
          class="form-input"
        />
      </div>
      <div class="btn-group">
        <button class="btn btn-info">save</button>
        <button type="button" @click="goBack" class="btn btn-danger-text">go back</button>
      </div>
    </form>
  </section>
</template>

<script>
import { toyService } from './../services/toy-service.js'

export default {
  name: 'toy-edit',
  data() {
    return {
      toyToEdit: null,
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
        console.log('id', id);
        toyService.getById(id).then((toy) => {
        this.toyToEdit = toy
      })
    } else this.toyToEdit = toyService.getNewToy()
    console.log('toyToEdit created',this.toyToEdit);
  },
  methods: {
    goBack() {
      this.$router.push('/toy')
    },
    saveToy() {
        this.toyToEdit.createdAt = Date.now()
            console.log('toyToEdit in save',this.toyToEdit);

      this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit })
      .then(() => {
        this.$router.push('/toy')
      })
    },
  },
}
</script>
