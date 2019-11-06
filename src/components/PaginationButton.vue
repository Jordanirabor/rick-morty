<template>
  <div class="pagination">
    <div class="pagination-info"></div>
    <div class="pagination-buttons__wrapper">
      <button class="paginate" @click="previousPage()">
        <!-- :disabled="isPreviousButtonDisabled" -->
        &#60;
      </button>

      <button class="paginate" @click="nextPage()">
        <!-- :disabled="isNextButtonDisabled" -->
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
  props: {
    // currentPage: {
    //   type: Number,
    //   required: true
    // },
    // total: {
    //   type: Number,
    //   required: true
    // },
    // disabled: {
    //   type: Boolean,
    //   default: false
    // }
  },
  methods: {
    // isPreviousButtonDisabled() {
    //   return this.currentPage === 1;
    // },
    // isNextButtonDisabled() {
    //   return this.currentPage === 25;
    // },
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
