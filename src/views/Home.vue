<template>
  <div class="home">
    <Header @emitting="getSearchValue" />
    <div class="home-content">
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
import http from "@/utils/service";

export default {
  name: "Home",
  data() {
    return {
      searchItem: "",
      locations: [],
      characters: [],
      episodes: [],
      locationsResult: [],
      charactersResult: [],
      episodesResult: [],
      searching: false,
      isLoading: true
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
    Footer: () => import("@/components/Footer.vue")
  },
  methods: {
    getData: async function() {
      await Promise.all([
        http.get("/character/"),
        http.get("/location/"),
        http.get("/episode/")
      ])
        .then(response => {
          // strip out unwanted data and reduce response to first 6 objects
          // console.log(response)

          const [characters, locations, episodes] = response;
          console.log(response);
          const popularCharacters = characters.data.results;
          popularCharacters.splice(6);
          this.characters = popularCharacters;

          const popularLocations = locations.data.results;
          popularLocations.splice(6);
          this.locations = popularLocations;

          const popularEpisodes = episodes.data.results;
          popularEpisodes.splice(6);
          this.episodes = popularEpisodes;

          this.isLoading = false;

          console.log(this.characters, this.episodes, this.locations);
        })
        .catch((charactersErr, locationsErr, episodesErr) => {
          console.log(charactersErr, locationsErr, episodesErr);
        });
    },
    makeSearchRequest: async function() {
      this.searching = true;
      try {
        await Promise.all([
          await http.get(`/character/?name=${this.searchItem}`),
          await http.get(`/location/?name=${this.searchItem}`),
          await http.get(`/episode/?name=${this.searchItem}`)
        ]).then(response => {
          const [
            characterResponse,
            locationResponse,
            episodeResponse
          ] = response;
          const locationSearchResponse = locationResponse.data.results;
          locationSearchResponse.splice(6);
          this.locations = locationSearchResponse;

          const characterSearchResponse = characterResponse.data.results;

          characterSearchResponse.splice(6);
          this.characters = characterSearchResponse;

          const episodeSearchResponse = episodeResponse.data.results;
          episodeSearchResponse.splice(6);
          this.episodes = episodeSearchResponse;

          console.log(
            locationSearchResponse,
            characterSearchResponse,
            episodeSearchResponse
          );
          this.$router.push({
            name: "search",
            query: { q: this.searchItem }
          });
        });
      } catch (error) {
        //  if (error.status === 404) {
        //       console.log('not found')
        //     }
        console.log(error);
      }
      this.searching = false;
    },
    getSearchValue: function(searchValue) {
      this.searchItem = searchValue;
      this.makeSearchRequest();
    }
  },
  mounted() {
    //get  data for landing page
    this.getData();
  }
};
</script>
