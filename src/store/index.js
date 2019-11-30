import Vue from "vue";
import Vuex from "vuex";
import { spliceData } from "@/utils/helpers";
import http from "@/utils/service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    characters: [],
    locations: [],
    episodes: [],
    loading: true,
    toast: {
      message: "",
      context: "",
      show: false
    }
  },
  mutations: {
    Characters(state, characters) {
      state.characters = characters;
    },
    Episodes(state, episodes) {
      state.episodes = episodes;
    },
    Locations(state, locations) {
      state.locations = locations;
    },
    Loading(state, bool) {
      state.loading = bool;
    },
    Toast(state, payload) {
      state.toast = { ...payload };
    }
  },
  getters: {
    isLoading: state => state.loading,
    characters: state => state.characters,
    episodes: state => state.episodes,
    locations: state => state.locations
  },

  actions: {
    async fetchData({ commit }) {
      await Promise.all([
        http.get("/character/"),
        http.get("/location/"),
        http.get("/episode/")
      ])
        .then(response => {
          // strip out unwanted data and reduce response to first 6 objects

          const [characters, locations, episodes] = response;

          const popularCharacters = characters.data.results;
          const popularLocations = locations.data.results;
          const popularEpisodes = episodes.data.results;

          spliceData(popularCharacters);
          spliceData(popularLocations);
          spliceData(popularEpisodes);
          commit("Characters", popularCharacters);
          commit("Locations", popularLocations);
          commit("Episodes", popularEpisodes);

          commit("Loading", false);
        })
        .catch(response => {
          const message = response;
          this.$store.dispatch("showToast", message, "error");
        });
    },

    showToast({ commit }, message, context) {
      commit("Toast", { message, context, show: true });
      setTimeout(() => {
        commit("Toast", { message: " ", context: " ", show: false });
      }, 3000);
    },

    async Search({ commit }, searchItem) {
      commit("Loading", true);
      console.log(searchItem);
      try {
        await Promise.all([
          await http.get(`/character/?name=${searchItem}`),
          await http.get(`/location/?name=${searchItem}`),
          await http.get(`/episode/?name=${searchItem}`)
        ]).then(response => {
          const [characters, locations, episodes] = response;
          const popularCharacters = characters.data.results;
          const popularLocations = locations.data.results;
          const popularEpisodes = episodes.data.results;

          spliceData(popularCharacters);
          spliceData(popularLocations);
          spliceData(popularEpisodes);
          console.log(popularCharacters);
          commit("Characters", popularCharacters);
          commit("Locations", popularLocations);
          commit("Episodes", popularEpisodes);

          commit("Loading", false);
          // this.$store.dispatch("showToast", "Results found", "success");
        });
      } catch (error) {
        const message = error;
        console.log(message);
        // this.$store.dispatch("showToast", message, "error");
      }
    }
  }
});
