<template>
  <div class="home">
    <Header @emitting="getSearchValue" />
    <div class="home-content">
      <div class="toast-wrapper">
        <Toast
          :message="toast.message"
          :context="toast.context"
          v-if="toast.show"
        />
      </div>
      <div class="search-result" v-if="searching"></div>
      <div class="home-content__wrapper" v-else>
        <div class="items">
          <h1 class="items-title">Popular Characters</h1>
          <div class="underline"></div>
          <div class="loading" v-if="isLoading">
            <Loader />
          </div>
          <Characters :characters="characters" />
          <router-link to="/characters">
            <MoreButton />
          </router-link>
        </div>
        <div class="items">
          <h1 class="items-title">Popular Locations</h1>
          <div class="underline"></div>
          <div class="loading" v-if="isLoading">
            <Loader />
          </div>
          <Locations :locations="locations" />
          <router-link to="/locations">
            <MoreButton />
          </router-link>
        </div>
        <div class="items">
          <h1 class="items-title">Popular Episodes</h1>
          <div class="underline"></div>
          <div class="loading" v-if="isLoading">
            <Loader />
          </div>
          <Episodes :episodes="episodes" />
          <router-link to="/episodes">
            <MoreButton />
          </router-link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// import  from '@/components/'
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      searchItem: "",
      searching: false,
      toast: {
        message: "",
        context: "",
        show: false
      }
    };
  },
  props: {
    q: {
      type: String,
      default: null
    }
  },
  components: {
    Header: () => import("@/components/Header.vue"),
    Characters: () => import("@/components/CharacterCard.vue"),
    Locations: () => import("@/components/LocationCard"),
    Episodes: () => import("@/components/EpisodeCard.vue"),
    MoreButton: () => import("@/components/MoreButton.vue"),
    Loader: () => import("@/components/Loader.vue"),
    Toast: () => import("@/components/Toast.vue"),
    Footer: () => import("@/components/Footer.vue")
  },
  methods: {
    ...mapActions(["fetchData"]),

    makeSearchRequest: async function() {
      this.$router.push({
        name: "search",
        query: { q: this.searchItem }
      });
    },

    getSearchValue: function(searchValue) {
      this.searchItem = searchValue;
      this.makeSearchRequest();
    }
  },
  mounted() {
    //get  data for landing page
    this.fetchData();
  },
  computed: mapGetters(["isLoading", "characters", "locations", "episodes"])
};
</script>
