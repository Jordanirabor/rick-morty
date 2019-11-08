<template>
  <header class="header">
    <div>
      <a href="/" class="logo-link">
        <img :src="require('@/assets/images/rickmorty-logo.png')" alt srcset />
      </a>
    </div>
    <div class="hero-image__wrapper">
      <img
        class="hero-image"
        :src="require('@/assets/images/rickmort-hero.png')"
        alt
        srcset
      />
    </div>
    <Search @searching="dispatch" />
  </header>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    dispatch: function(searchValue) {
      this.$emit("emitting", searchValue);
    }
  },
  components: {
    Search: () => import("@/components/Search")
  }
};
</script>
<style lang="scss"></style>
