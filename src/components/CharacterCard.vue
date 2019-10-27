<template>
  <div class="card-wrapper">
    <article
      v-for="character in characters"
      :key="character.id"
      class="card-content"
    >
      <div class="card-image">
        <img :src="character.image" alt="" />
      </div>
      <div class="card-description__wrapper">
        <h2 class="card-name">
          {{ character.name }}
        </h2>
        <div class="description">
          <p><strong> Gender: </strong> {{ character.gender }}</p>
          <p><strong> Status: </strong> {{ character.status }}</p>
          <p><strong> Specie: </strong> {{ character.species }}</p>
        </div>
        <router-link
          :to="{
            name: 'character',
            params: { id:character.id, character: character }
          }"
        >
          <Button
        /></router-link>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  name: "Characters",
  data() {
    return {
    };
  },
  props: ["characters"],
  // mounted() {
  //   this.characterData = character
  // },
  components: {
    Button: () => import("@/components/Button")
  }
};
</script>
<style lang="scss"></style>
