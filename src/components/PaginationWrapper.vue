<template>
  <div>
    <Pagination />
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  }
};
</script>
