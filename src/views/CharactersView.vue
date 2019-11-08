<template>
  <div class>
    <Header @emitting="getSearchValue" />
    <div class="toast-wrapper">
      <Toast
        :message="toast.message"
        :context="toast.context"
        v-if="toast.show"
      />
    </div>
    <div class="home-content__wrapper">
      <div class="items">
        <h1 class="items-title">Characters</h1>

        <div class="underline"></div>
        <div class="loading" v-if="isLoading">
          <Loader />
        </div>
        <Characters :characters="characters" />
      </div>
    </div>
    <div class="paginate-info">
      <span>{{ from }} - {{ to }} of {{ pageInfo.count }}</span>
      <Pagination :pageInfo="pageInfo" @changing="getAction" />
    </div>

    <Footer />
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
    Pagination: () => import("@/components/PaginationButton.vue"),
    Toast: () => import("@/components/Toast.vue"),
    Footer: () => import("@/components/Footer.vue")
  },
  data() {
    return {
      searchItem: "",
      isLoading: true,
      characters: [],
      totalViewed: [],
      pageInfo: {},
      currentPage: 1,
      perPage: 20,
      from: 1,
      to: "",
      toast: {
        show: false,
        context: "",
        message: ""
      }
    };
  },
  props: {
    q: {
      type: String,
      default: null
    }
  },
  methods: {
    showToast(message, context) {
      this.toast = { message, context, show: true };
      setTimeout(() => {
        this.toast = { message: "", context: "", show: false };
      }, 3000);
    },
    getAction: function(value) {
      this.changePage(value);
    },
    makeSearchRequest: async function() {
      this.isLoading = true;
      try {
        await Promise.all([
          await http.get(`/character/?name=${this.searchItem}`)
        ]).then(response => {
          const [characterResponse] = response;

          const characterSearchResponse = characterResponse.data.results;
          this.pageInfo = characterResponse.data.info;

          this.characters = characterSearchResponse;
          this.showToast("Results found", "success");
        });
      } catch (error) {
        this.showToast(error, "error");
      }
      this.isLoading = false;
    },
    changePage: async function(value) {
      switch (value) {
        case "next":
          this.currentPage = this.currentPage + 1;
          this.from = this.to += 1;
          this.to = this.to += this.perPage - 1;
          if (this.to > this.pageInfo.count) {
            this.from = this.from;
            this.to = this.pageInfo.count;
            this.showToast("End Of Info", "error");
          }
          break;
        case "previous":
          this.currentPage = this.currentPage - 1;
          this.from = this.from - this.perPage;
          this.to = this.to - this.perPage;

          if (this.currentPage < 1) {
            this.from = 1;
            this.to = this.perPage;
            this.showToast("Beginning Of Info", "error");
          }
          break;
        default:
          this.currentPage = value;
      }
      http
        .get(
          `https://rickandmortyapi.com/api/character/?page=${this.currentPage}`
        )
        .then(response => {
          this.isLoading = false;
          this.characters = response.data.results;
          this.totalViewed.push(...this.characters);
          this.pageInfo = response.data.info;
        })
        .catch(error => {
          this.showToast(error, "error");
        });
    },

    getSearchValue: function(searchValue) {
      this.searchItem = searchValue;
      this.makeSearchRequest();
    }
  },
  async mounted() {
    http
      .get(`https://rickandmortyapi.com/api/character`)
      .then(response => {
        this.isLoading = false;
        this.characters = response.data.results;
        this.totalViewed.push(...this.characters);
        const info = response.data.info;
        this.pageInfo = { ...info };
        this.to = this.perPage;
      })
      .catch(error => {
        this.showToast(error, "error");
      });
  },
  computed: {}
};
</script>
<style lang="scss" scoped></style>
