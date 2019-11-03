<template>
  <div class="detail-card__wrapper">
    <article v-for="location in locations" :key="location.id" class="detail-card__content">
      <div class="detail-description__wrapper">
        <div class="detail-card__description">
          <h3 class="detail-name">{{ location.name }}</h3>
          <div>{{location.dimension }}</div>
          <div>{{location.type}}</div>
        </div>
      </div>
      <router-link
        :to="{
            name: 'location',
            params: { id: location.id, location: location }
          }"
      >
        <Button />
      </router-link>
    </article>
  </div>
</template>
<script>
export default {
  name: "Locations",
  props: ["locations"],
  components: {
    Button: () => import("@/components/Button.vue")
  }
};
</script>
<style lang="scss"></style>
