<template>
  <div class>
    <Header />
    <div class="search-result" v-if="searching"></div>
    <div class="home-content__wrapper" v-else>
      <div class="items">
        <h1 class="items-title">Characters</h1>
        <div class="underline"></div>
        <div class="loading" v-if="isLoading">
          <Loader />
        </div>
        <Characters :characters="characters" />
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/utils/service";
export default {
  name: "CharacterView",
  components: {
    Loader: () => import("@/components/Loader.vue"),
    Header: () => import("@/components/Header"),
    Characters: () => import('@/components/CharacterCard.vue')
  },
  data() {
    return {
      isLoading: true,
      characters: [],
      searching: false,
      currentPage: 1,
      perPage: 0,


    };
  },
  methods: {
    getData: async function() {
      http
        .get("/character/")
        .then(response => {
          // strip out unwanted data and reduce response to first 6 objects
          // console.log(response)
          this.isLoading=false
          this.characters = response.data.results;
          console.log(response);

        })
        .catch();
    }
  },
  mounted() {
    this.getData()
  },
};
</script>
<style lang="scss" scoped></style>
