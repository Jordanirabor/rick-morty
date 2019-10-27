<template>
  <div class="card-wrapper">
    <div v-for="location in locations" :key="location.id" class="card-content">
      <div class="card-image">
        <img :src="location.image" alt="" />
      </div>
      <h3 class="card-name">
        {{ location.name }}
      </h3>
      <div class="card-description"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Locations",
  props: ["locations"]
};
</script>
<style lang="scss"></style>
