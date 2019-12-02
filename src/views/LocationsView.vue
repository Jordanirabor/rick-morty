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
        <h1 class="items-title">Locations</h1>

        <div class="underline"></div>
        <div class="loading" v-if="isLoading">
          <Loader />
        </div>
        <Locations :locations="locations" />
      </div>
    </div>
    <div class="paginate-info">
      <!-- <span>{{ from }} - {{ to }} of {{ pageInfo.count }}</span> -->
      <Pagination :pageInfo="pageInfo" @changing="getAction" />
    </div>

    <Footer />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "LocationView",
  components: {
    Loader: () => import("@/components/Loader.vue"),
    Header: () => import("@/components/Header"),
    Locations: () => import("@/components/LocationCard.vue"),
    Pagination: () => import("@/components/PaginationButton.vue"),
    Toast: () => import("@/components/Toast.vue"),
    Footer: () => import("@/components/Footer.vue")
  },
  data() {
    return {
    };
  },
  props: {
    q: {
      type: String,
      default: null
    }
  },
  methods: {
    ...mapActions(["getAllData", "changePage"]),

    getAction: function(value) {
      this.changePage({ value: value, name: "character" });
    },
    search: function() {
      this.$store.dispatch("makeSearchRequest", {
        name: "character",
        searchValue: this.searchItem
      });
    },

    getSearchValue: function(searchValue) {
      this.searchItem = searchValue;
      this.search();
    }
  },
  async mounted() {
    this.getAllData("character");
  },
  computed: mapGetters(["characters", "isLoading", "toast", "pageDetails"])
};
</script>
<style lang="scss" scoped></style>
