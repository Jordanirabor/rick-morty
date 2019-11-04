<template>
  <div class="detail-wrapper">
    <h3>{{ episode.name }}</h3>
    <div class="detail-wrapper__description">
      <div>
        <span>Air date: </span>
        {{ episode.air_date }}
      </div>
      <div>
        <span>Episode: </span>
        {{ episode.episode }}
      </div>
    </div>
    <div>
      <Detail />
    </div>
  </div>
</template>
<script>
export default {
  name: "episode",
  props: ["episode"],
  components: {
    Detail: () => import("@/components/DetailText.vue")
  }
};
</script>
<style lang=""></style>
