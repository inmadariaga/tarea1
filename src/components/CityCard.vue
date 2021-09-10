<template>
  <router-link :to="{ name : 'CityDetails', params: { id: city.id } }">
    <div class="cityCard">
      <h1>{{ city.name }}</h1>
      <h2> {{ city.country }} </h2>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'CityCard',
  props: {
    city: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cityCard {
  background-color: darkcyan;
}
</style>
