<template>
  <div class="home">
    <Header @emitting="getSearchValue" />
    <div :class="home - content">
      <div class="search-result" v-if="searching"></div>
      <div class="home-content__wrapper" v-else>
        <div class="characters"></div>
        <div class="locations"></div>
        <div class="episodes"></div>
      </div>
    </div>
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
      searching: false
    };
  },
  components: {
    Header: () => import("@/components/Header.vue")
  },
  async beforeMount() {
    //get  data for landing page
    http
      .all(
        await http.get("/character/"),
        await http.get("/location/"),
        await http.get("/episode/")
      )
      .then(
        http.spread((characters, locations, episodes) => {
          // strip out unwanted data and reduce response to first 6 objects

          const popularCharacters = characters.data.results;
          this.characters = popularCharacters.splice(6);

          const popularLocations = locations.data.results;
          this.locations = popularLocations.splice(6);

          const popularEpisodes = episodes.data.results;
          this.episodes = popularEpisodes.splice(6);

          console.log(this.episodes, this.characters, this.locations);
        })
      )
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    makeSearchRequest: async function() {
      this.searching = true;
      try {
        const locationSearchResponse = await http.get(
          `/location/?name=${this.searchItem}`
        );
        // const characterSearchResponse = await http.get(
        //   `/episode/?name=${this.searchItem}`
        // );
        // const episodeSearchResponse = await http.get(
        //   `/character/?name=${this.searchItem}`
        // );
        console.log(
          locationSearchResponse
          // characterSearchResponse,
          // episodeSearchResponse
        );
      } catch (error) {
        console.error(error);
      }
    },
    getSearchValue: function(searchValue) {
      this.searchItem = searchValue;
      this.makeSearchRequest();
    }
  }
};
</script>
