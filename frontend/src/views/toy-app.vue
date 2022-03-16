<template>
  <section class="toy-app container flex flex-col gap-1">
    <button @click="goToEdit" class="btn btn-secondary">Add a new toy</button>
    <toy-filter @setFilter="setFilter" />
    <!-- <toy-filter @setFilter="setFilter" @setSort="setSort" /> -->
    <toy-list v-if="toys" @removeToy="removeToy" :toys="toys" />
  </section>
</template>

<script>
import { toyService } from "./../services/toy-service.js";
import toyFilter from "./../components/toy-filter.vue";
import toyList from "./../components/toy-list.vue";

export default {
  name: "toy-app",
  data() {
    return {
      filterBy: null,
    };
  },
  computed: {
    toys() {
      // return this.$store.getters.toysToShow;
      return this.$store.getters.toys;
    },
    // toysToShow() {
    //   if (!this.filterBy) return this.toys
    //   const regex = new RegExp(this.filterBy.txt, 'i')
    //   return this.toys.filter((toy) => regex.test(toy.name))
    // },
  },
  created() {
    this.loadToys();
  },
  methods: {
    loadToys() {
      //   toyService.query().then((toys) => (this.toys = toys))
      this.$store.dispatch({ type: "loadToys" });
    },
    // setFilter(filterBy) {
    //     this.filterBy = filterBy
    //     console.log('app filter on' , this.filterBy);
    //     this.$store.commit({type:'setFilter' , filterBy })
    // },

    setFilter(filterBy) {
      this.filterBy = filterBy;
      this.$store.dispatch({ type: "filter", filterBy });
    },
    // setSort(sortBy) {
    //   this.sortBy = sortBy;
    //   console.log("app sort on", this.sortBy);
    //   this.$store.commit({ type: "setSort", sortBy });
    //   this.$store.commit({ type: "sortedToys" });
    // },
    goToEdit() {
      this.$router.push(`/toy/edit`);
    },
    removeToy(toyId) {
      console.log("Removing...", toyId);
      this.$store.dispatch({ type: "removeToy", id: toyId });
    },
    // removeProduct(productId) {
    //     console.log('Removing...', productId);
    //     this.$store.dispatch({ type: 'removeProduct', productId })
    //         .then(() => {
    //             showMsg(`Product: ${productId} Removed`)
    //         })
    //         .catch(()=>{
    //             showMsg(`Cannot remove product: ${productId}`, 'danger')
    //         })
    //     this.productToEdit = productService.getEmptyProduct()
    // }
  },
  components: {
    toyList,
    toyFilter,
  },
  mounted() {},
};
</script>
