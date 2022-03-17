<template>
  <GMapMap
    :center="center"
    :zoom="10"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
  >
    <GMapCluster>
      <div class="about">
        <h1>This is an about page</h1>
      </div>

      <GMapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GMapCluster>
  </GMapMap>

  <!-- <GMapMap
      :center="center"
      :zoom="10"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
   >
      <GMapCluster>
         <GMapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"
         />
      </GMapCluster>
   </GMapMap> -->
</template>


<script>
export default {
  name: "toy-dashboard",
  data() {
    return {
      toy: null,
      center: { lat: 51.093048, lng: 6.84212 },
      markers: [
               {
                  position: {
                     lat: 32.088179,
                     lng: 34.790144,
                  },
               }, // Along list of clusters
               {
                  position: {
                     lat: 32.066278,
                     lng: 34.830301,
                  },
               }, // Along list of clusters
               {
                  position: {
                     lat: 32.093869,
                     lng: 34.882401,
                  },
               }, // Along list of clusters
      ],
    };
  },
  created() {},
  components: {},
  computed: {},
  methods: {},
};
</script>



<style>
   .vue-map-container {
      height: 700px;
      width: 70vw;
   }
</style>
