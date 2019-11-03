<template>
  <div class="character-detail__wrapper">
    <img :src="character.image" alt="" srcset="" />

    {{ character.image }}

    {{ character.name }}
  </div>
</template>
<script>
export default {
  name: "Character",
  props: ["character"],
  data() {
    return {};
  },
  mounted: function() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      console.log(this.$route.character);
      console.log(this.$route.params);
    }
  }
};
</script>
<style lang="scss"></style>
