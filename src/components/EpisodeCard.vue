<template>
  <div class="card-wrapper">
    <div v-for="episode in episodes" :key="episode.id" class="card-content">
      <div class="card-image">
        <img :src="episode.image" alt="" />
      </div>
      <h3 class="card-name">
        {{ episode.name }}
      </h3>
      <div class="card-description"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Episodes",
  props: ["episodes"]
};
</script>
<style lang="scss"></style>
