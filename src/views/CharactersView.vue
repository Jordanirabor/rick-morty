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
    <Pagination :pageInfo="pageInfo" @changing="getAction" />
  </div>
</template>
<script>
import http from "@/utils/service";
export default {
  name: "CharacterView",
  components: {
    Loader: () => import("@/components/Loader.vue"),
    Header: () => import("@/components/Header"),
    Characters: () => import("@/components/CharacterCard.vue"),
    Pagination: () => import("@/components/PaginationButton.vue")
  },
  data() {
    return {
      isLoading: true,
      characters: [],
      searching: false,
      pageInfo: {
        total: "",
        next: "",
        pages: "",
        previous: ""
      },
      currentPage: 1,
      toast: {
        show: false,
        context: "",
        message: ""
      }
    };
  },
  methods: {
    getData: async function() {
      http
        .get(
          `https://rickandmortyapi.com/api/character/?page=${this.currentPage}`
        )
        .then(response => {
          // console.log(response)
          this.isLoading = false;
          this.characters = response.data.results;
          console.log(response.data.info);
          this.pageInfo = response.data.info;
          console.log(this.pageInfo);
        })
        .catch();
    },
    getAction: function(value){
      this.changePage(value)
    },
    changePage: function(value) {
      switch (value) {
        case "next":
          this.currentPage = this.currentPage + 1;
          console.log(this.currentPage);
          break;
        case "previous":
          this.currentPage = this.currentPage - 1;
          break;
        default:
          this.currentPage = value;
      }
    }
  },
  mounted() {
    
    this.getData();
  },
  updated() {
 
  this.getData();
  },
};
</script>
<style lang="scss" scoped></style>
