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
    <div style="display: inline-block">
      <label style="margin-left: 20px">
        Labels:
        <!-- <p style="margin-left: 10px">default</p> -->
        <el-select
          v-model="filterBy.labels"
          @change="setFilter"
          multiple
          placeholder="Select"
          style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </label>
    </div>

    <!-- <select @change="setFilter" multiple v-model="filterBy.labels">
        <option value="On wheels">On wheels</option>
        <option value="Box game">Box game</option>
        <option value="Art">Art</option>
        <option value="Baby">Baby</option>
        <option value="Doll">Doll</option>
        <option value="Puzzle">Puzzle</option>
        <option value="Outdoor">Outdoor</option>
      </select> -->
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

    <!-- Sort by:
        <select name="sortBy" id="sortBy" @change="setSort" v-model="sortBy">
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Date</option>
        </select> -->
  </section>
</template>


<script>
import { ref } from "vue";

export default {
  name: "toy-filter",
  data() {
    return {
      filterBy: {
        name: "",
        isInStock: false,
        labels: ref([]),
        sortBy: "",
        direction: 1
      },
      options: [
        {
          value: "On wheels",
          label: "On wheels",
        },
        {
          value: "Box game",
          label: "Box game",
        },
        {
          value: "Art",
          label: "Art",
        },
        {
          value: "Baby",
          label: "Baby",
        },
        {
          value: "Doll",
          label: "Doll",
        },
        {
          value: "Puzzle",
          label: "Puzzle",
        },
        {
          value: "Outdoor",
          label: "Outdoor",
        },
      ],
    };
  },
  computed: {},
  methods: {
    setFilter() {
      console.log("set filter on", this.filterBy);
      this.$emit("setFilter", JSON.parse(JSON.stringify(this.filterBy)));
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
