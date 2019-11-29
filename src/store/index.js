import Vue from "vue";
import Vuex from "vuex";
import { spliceData } from "@/utils/helpers";
import http from "@/utils/service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchQuery: "",
    characters: [],
    locations: [],
    episodes: [],
    searching: false,
    isLoading: true,
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
    Searching(state, bool) {
      state.searching = bool;
    },
    Loading(state, bool) {
      state.loading = bool;
    },
    Toast(state, payload) {
      state.toast = { ...payload };
    }
  },
  getters: {
    isLoading: state => state.Loading,
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
          this.dispatch("showToast", message, "error");
        });
    },
    showToast({ commit }, message, context) {
      commit("Toast", { message, context, show: true });
      setTimeout(() => {
        commit("Toast", { message: " ", context: " ", show: false });
      }, 3000);
    },
    async Search({ commit }) {
      commit("Loading", true);
      try {
        await Promise.all([
          await http.get(`/character/?name=${this.searchItem}`),
          await http.get(`/location/?name=${this.searchItem}`),
          await http.get(`/episode/?name=${this.searchItem}`)
        ]).then(response => {
          const [characters, locations, episodes] = response;
          commit("Characters", spliceData(characters.data.result));
          commit("Locations", spliceData(locations.data.result));
          commit("Episodes", spliceData(episodes.data.result));
          this.dispatch("showToast", "Results found", "success");
        });
      } catch (error) {
        const message = error;
        this.dispatch("showToast", message, "error");
      }
    }
  }
});
