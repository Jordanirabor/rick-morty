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
    },
    currentPage: 1,
    pageDetails: {
      to: null,
      from: 1,
      perPage: 20,
      totalData: null,
      totalPages: null,
      viewedPages: null
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
    },
    pageData(state, payload) {
      state.pageData = { ...payload };
    },
    currentPage(state, payload) {
      state.currentPage += payload;
    },
    setTotalData(state, payload) {
      state.pageDetails.totalData = payload;
    },
    setTotalPages(state, payload) {
      state.pageDetails.totalPages = payload;
    }
    // changeTo(state, payload) {
    //   state.pageDetails.to += payload;
    // },
    // changeFrom(state, payload) {
    //   state.pageDetails.from += payload - 1;
    // },
    // updateViewedPages(state, payload) {
    //   state.pageDetails.viewedPages += payload;
    // }
  },
  getters: {
    isLoading: state => state.loading,
    characters: state => state.characters,
    episodes: state => state.episodes,
    locations: state => state.locations,
    toast: state => state.toast,
    page: state => state.currentPage,
    pageDetails: state => state.pageDetails
  },

  actions: {
    showToast({ commit }, { message, context }) {
      commit("Toast", { message: message, context: context, show: true });
      setTimeout(() => {
        commit("Toast", { message: " ", context: " ", show: false });
      }, 3000);
    },
    async fetchPopularData({ commit, dispatch }) {
      await Promise.all([
        http.get("/character/"),
        http.get("/location/"),
        http.get("/episode/")
      ])
        .then(response => {
          const [characters, locations, episodes] = response;

          const popularCharacters = characters.data.results;
          const popularLocations = locations.data.results;
          const popularEpisodes = episodes.data.results;

          // strip out unwanted data and reduce response to first 6 objects

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
          dispatch("showToast", { message: message, context: "error" });
        });
    },

    async searchPopularData({ commit, dispatch }, searchItem) {
      commit("Loading", true);
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

          dispatch("showToast", {
            message: "Results found",
            context: "success"
          });

          // strip out unwanted data and reduce response to first 6 objects

          spliceData(popularCharacters);
          spliceData(popularLocations);
          spliceData(popularEpisodes);

          commit("Characters", popularCharacters);
          commit("Locations", popularLocations);
          commit("Episodes", popularEpisodes);

          commit("Loading", false);
        });
      } catch (error) {
        const message = error;
        dispatch("showToast", { message: message, context: "error" });
      }
    },
    async getAllData({ state, commit, dispatch }, name) {
      commit("Loading", true);
      http
        .get(`/${name}/?page=${state.currentPage}`)

        .then(response => {
          commit("setTotalData", response.data.info.count);
          commit("setTotalPages", response.data.info.pages);

          if (state.currentPage === 1) {
            // commit("changeTo", state.pageDetails.perPage);
          }
          /**
           *  Makes the first letter uppercase and concatenates the remaining characters after splicing  and adds "s"
           *
           */
          const mutationName =
            name.charAt(0).toUpperCase() + name.slice(1) + "s";

          commit(`${mutationName}`, response.data.results);
          commit("Loading", false);
        })
        .catch(error => {
          const message = error;
          dispatch("showToast", { message: message, context: "error" });
        });
    },
    async makeSearchRequest({ commit, dispatch }, { name, searchValue }) {
      commit("Loading", true);
      try {
        await http.get(`/${name}/?name=${searchValue}`).then(response => {
          const [dataResponse] = response;
          commit("Loading", false);

          //show toast

          dispatch("showToast", {
            message: "Results found",
            context: "success"
          });
          /**
           *  Makes the first letter uppercase and concatenates the remaining characters after splicing  and adds "s"
           *
           */
          const mutationName =
            name.charAt(0).toUpperCase() + name.slice(1) + "s";

          commit(`${mutationName}`, dataResponse.data.results);
        });
      } catch (error) {
        const message = error;
        dispatch("showToast", { message: message, context: "error" });
      }
    },
    async changePage({ state, commit, dispatch }, { value, name }) {
      switch (value) {
        case "next":
          dispatch("getAllData", name);
          commit("currentPage", 1);

          // commit("changeTo", state.pageDetails.perPage);

          // commit("changeFrom", state.pageDetails.perPage);

          if (state.currentPage > state.pageDetails.totalPages) {
            commit("currentPage", -1);
            // commit( "changeTo", state.pageDetails.perPage );

            dispatch("showToast", {
              message: "End Of Info",
              context: "error"
            });
          }
          break;
        case "previous":
          dispatch("getAllData", name);
          commit("currentPage", -1);

          if (state.currentPage < 1) {
            commit("currentPage", -1);

            dispatch("showToast", {
              message: "Beginning Of Info",
              context: "error"
            });
          }
          break;
        default:
          commit("currentPage", 0);
      }
    }
  }
});
