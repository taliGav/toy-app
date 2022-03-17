<template>
  <section class="toy-dashboard flex flex-col items-center gap-2">
    <article>
        <p>sssssss</p>
    </article>

      <custom-card>
      <template #header>
        <p>sssssss</p>
      </template>

      <template #footer>
        <div class="btn-group">
        <p>sssssss</p>
        </div>
      </template>
    </custom-card>
 
        <p>sssssss</p>
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
  name: 'toy-dashboard',
  data() {
    return {
      toy: null,
    }
  },
  created() {
  },
    components: {
    customCard,
  },
  computed: {
},
  methods: {
  },
}
</script>
