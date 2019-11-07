<template>
  <div class="pagination">
    <div class="pagination-info"></div>
    <div class="pagination-buttons__wrapper">
      <button class="paginate" @click="previousPage()">
        &#60;
      </button>

      <button class="paginate" @click="nextPage()">
        &#62;
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      next: "next",
      previous: "previous"
    };
  },
  props: {},
  methods: {
    nextPage() {
      this.$emit("changing", this.next);
    },
    previousPage() {
      this.$emit("changing", this.previous);
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  button {
    margin: 0.2em;
    cursor: pointer;
  }
}
</style>
