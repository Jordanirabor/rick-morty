<template>
  <div class="detail-card__wrapper">
    <article
      v-for="episode in episodes"
      :key="episode.id"
      class="detail-card__content"
    >
      <div class="detail-description__wrapper">
        <div class="detail-card__description">
          <h3 class="detail-name">{{ episode.name }}</h3>
          <div>{{ episode.episode }}</div>
          <div>{{ episode.air_date }}</div>
        </div>
      </div>
      <router-link
        :to="{
          name: 'episode',
          params: { id: episode.id, episode: episode }
        }"
      >
        <Button />
      </router-link>
    </article>
  </div>
</template>
<script>
export default {
  name: "Episodes",
  props: ["episodes"],
  components: { Button: () => import("@/components/Button") }
};
</script>
<style lang="scss"></style>
