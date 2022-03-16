<template>
  <section class="toy-filter">
    <input
      v-focus
      v-model="filterBy.name"
      @input="setFilter"
      type="text"
      class="form-input"
      placeholder="Search toy name..."
    />
    <div class="in-stock-input">
      <input
        type="checkbox"
        @change="isInStock"
        id="isInStock"
        name="isInStock"
      />
      <label for="scales">In stock</label>
    </div>
    <label>
      Labels:
      <select @change="setFilter" multiple v-model="filterBy.labels">
        <option value="On wheels">On wheels</option>
        <option value="Box game">Box game</option>
        <option value="Art">Art</option>
        <option value="Baby">Baby</option>
        <option value="Doll">Doll</option>
        <option value="Puzzle">Puzzle</option>
        <option value="Outdoor">Outdoor</option>
      </select>
      <div class="toy-sort">
        <label for="toy">
          Sort By:
          <select @change="setFilter" v-model="filterBy.sortBy">
            <option value="time">Time</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label>
      </div>
    </label>

    <!-- Sort by:
        <select name="sortBy" id="sortBy" @change="setSort" v-model="sortBy">
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Date</option>
        </select> -->
  </section>
</template>

<script>
export default {
  name: "toy-filter",
  data() {
    return {
      filterBy: {
        name: "",
        isInStock: false,
        labels: [],
        sortBy: "",
      },
    };
  },
  computed: {},

  methods: {
    setFilter() {
      console.log("set filter on", this.filterBy);
        this.$emit('setFilter', JSON.parse(JSON.stringify(this.filterBy)));
    },
    isInStock() {
      let stockStatus = !this.filterBy.isInStock;
      this.filterBy.isInStock = stockStatus;
      console.log("stockStatus", stockStatus);

      this.setFilter();
    },
    // setSort() {
    //   console.log("set sort on");
    //   this.$emit("setSort", this.sortBy);
    // },
  },
};
</script>
