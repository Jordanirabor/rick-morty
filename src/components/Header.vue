<template>
  <header class="header">
    <div>
      <a href="/" class="logo-link">
        <img
          src="https://res.cloudinary.com/djalafcj9/image/upload/f_auto,fl_progressive/v1574951117/rickmorty-logo_jfohus.png"
          alt
          srcset
        />
      </a>
    </div>
    <div class="hero-image__wrapper">
      <img
        class="hero-image"
        src="https://res.cloudinary.com/djalafcj9/image/upload/f_auto/v1574951117/rickmort-hero_bpv8xd.png"
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
