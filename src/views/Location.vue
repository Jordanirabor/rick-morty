<template>
  <div class="detail-wrapper">
    <h3>{{ location.name }}</h3>
    <div class="detail-wrapper__description">
      <div>
        <span>Dimension: </span>
        {{ location.dimension }}
      </div>
      <div>
        <span>Type:</span>
        {{ location.type }}
      </div>
    </div>
    <div>
      <Detail />
    </div>
  </div>
</template>
<script>
export default {
  name: "location",
  props: ["location"],
  components: {
    Detail: () => import("@/components/DetailText.vue")
  }
};
</script>
<style lang=""></style>
