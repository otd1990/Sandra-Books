<template>
  <div class="manage-reviews-page">
    <h1 class="text-center">Admin Review Approval</h1>
    <p class="text-center">
      All the reviews are below, you can approve or reject them here.<br />
      Rejected reviews will be deleted and approved reviews will appear on the
      site on the <nuxt-link to="/reviews">reviews page</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.manage-reviews-page {
  margin: 1.2rem;
  h1 {
    font-size: 2.4rem;
  }
}
</style>
