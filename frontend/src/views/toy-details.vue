<template>
  <section v-if="toy" class="toy-details flex flex-col items-center gap-2">
    <article>
        <p><span class="fw-bold">name:</span> {{ toy.name }}</p>
        <p><span class="fw-bold">inStock:</span> {{ toy.inStock }}</p>
        <p><span class="fw-bold">Price:</span> {{ $filters.currencyUSD(toy.price) }}</p>
    </article>

      <custom-card>
      <template #header>
        <p><span class="fw-bold">Serial Number:</span> {{ toy._id }}</p>
        <p><span class="fw-bold">Updated at:</span> {{ updateTime }}</p>
        <p><span class="fw-bold">Toy Name:</span> {{ toy.name }}</p>
        <p><span class="fw-bold">Toy Labels:</span> {{ labels }}</p>
        <p><span class="fw-bold">Toy Price:</span> {{ $filters.currencyUSD(toy.price) }}</p>
        <p><span class="fw-bold">Available in stock:</span> {{ stock }}</p>
        <p><span class="fw-bold">Reviews:</span> {{reviews }}</p>
      </template>

      <template #footer>
        <div class="btn-group">
          <button @click="goToEdit" class="btn btn-primary">edit</button>
          <button @click="removeToy(toy._id)" class="btn btn-danger">delete</button>
        </div>
      </template>
    </custom-card>
 
    <button @click="goBack" class="btn btn-primary">go back</button>
  </section>
</template>

// const toy = {
//    "labels": ["Doll", "Battery Powered", "Baby"],
//     "createdAt": 1631031801011,
//    "inStock": true
//    }


<script>
import { toyService } from '../services/toy-service.js'
import customCard from './../components/custom-card.vue'

export default {
  name: 'toy-detail',
  data() {
    return {
      toy: null,
    }
  },
  created() {
    const { id } = this.$route.params
  console.log(id);
    // console.log('this.$route.params',this.$route.params);
    // console.log('this.$route.params id',id);
    toyService.getById(id).then((toy) => {
      console.log('getById toy' , toy);
      this.toy = toy
    })
  },
    components: {
    customCard,
  },
  computed: {
    labels(){
      if (!this.toy.labels) return
      console.log('this.toy.labels', this.toy.labels);
   return this.toy.labels.join(', ')
  },
    stock(){
   return (this.toy.inStock) ? 'Yes' : 'No'
  },
    reviews(){
      console.log('this.toy.reviews.', this.toy.reviews);
   return this.toy.reviews.join(', ')
  },
  updateTime(){
    return new Date(this.toy.createdAt).toLocaleString()
  }
},
  methods: {
    goBack() {
      this.$router.push('/toy')
    },
    goToEdit() {
      this.$router.push(`/toy/edit/${this.toy._id}`)
    },
    removeToy(toyId) {
        console.log('Removing...', toyId);
      this.$store.dispatch({ type: 'removeToy', id: toyId })
      .then(() => {
        this.$router.push('/toy')
      })

    },

  },
}
</script>
