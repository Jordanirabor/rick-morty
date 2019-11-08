<template>
  <div class="character-detail__wrapper">
    <div class="character-image__wrapper">
      <img
        :src="character.image"
        :alt="character.name + 'picture'"
        srcset
        class="character-image"
      />
      <h2 class="character-name">{{ character.name }}</h2>
    </div>
    <div class="character-detail__description">
      <div class="character-detail">
        <div>
          <div>
            <span>Gender</span>
            {{ character.gender }}
          </div>
          <div>
            <span>Location</span>
            {{ character.location.name }}
          </div>
          <div>
            <span>Origin</span>
            {{ character.origin.name }}
          </div>
        </div>
        <div>
          <div>
            <span>Specie</span>
            {{ character.species }}
          </div>
          <div>
            <span>Status</span>
            {{ character.status }}
          </div>
        </div>
      </div>
      <div class="detail-text"><Detail /></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Character",
  props: ["character"],
  components: {
    Detail: () => import("@/components/DetailText.vue")
  },
  data() {
    return {};
  },
  mounted: function() {
    this.getDetails();
  },
  methods: {
    getDetails() {}
  }
};
</script>
<style lang="scss"></style>
