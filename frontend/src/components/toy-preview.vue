<template>
  <li class="toy-preview">
    <custom-card>
      <template #header>
        <p><span class="fw-bold">Toy Name:</span> {{ toy.name }}</p>
        <p><span class="fw-bold">Available in stock:</span> {{ stock }}</p>
        <p>
          <span class="fw-bold">Price:</span>
          {{ $filters.currencyUSD(toy.price) }}
        </p>
      </template>

      <template #footer>
        <!-- <el-row class="btn-group">
          <el-button  type="primary" :icon="Edit" primary @click="goToEdit" class="btn btn-primary" />
          <el-button type="info" :icon="Search" info @click="goToDetail" class="btn btn-info"/>
          <el-button type="danger" :icon="Delete" Danger @click="removeToy(toy._id)" class="btn btn-danger" />
        </el-row> -->
        <div class="btn-group">
          <button @click="goToEdit" class="btn btn-primary">edit</button>
          <button @click="goToDetail" class="btn btn-info">details</button>
          <button @click="removeToy(toy._id)" class="btn btn-danger">
            delete
          </button>
        </div>
      </template>
    </custom-card>
  </li>
</template>

<script>
import customCard from "./custom-card.vue";
// import { Search, Edit, Delete } from "@element-plus/icons-vue";

export default {
  name: "toy-preview",
  props: {
    toy: Object,
  },
  components: {
    customCard,
    // Search,
    // Edit,
    // Delete
  },
  computed: {
    stock() {
      return this.toy.inStock ? "Yes" : "No";
    },
  },
  methods: {
    goToDetail() {
      this.$router.push(`/toy/${this.toy._id}`);
    },
    goToEdit() {
      this.$router.push(`/toy/edit/${this.toy._id}`);
    },
    removeToy(toyId) {
      this.$emit("removeToy", toyId);
    },
  },
};
</script>
