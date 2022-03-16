<template>
  <section class="home">
      HOME PAGE

          <button @click="goToToyApp" class="btn btn-primary">Toy App</button>
          <button @click="goToAbout" class="btn btn-primary">About</button>

  </section>
</template>

<script>
export default {


  methods: {
    goToToyApp() {
      this.$router.push('/toy')
    },
    goToAbout() {
      this.$router.push('/about')
    },
  },

}
</script>

<style>

</style>