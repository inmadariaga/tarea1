<template>
  <router-link :to="{ name : 'UserDetails', params: { id: user.id } }">
    <div class="userCard">
      <h1>{{ user.name }} {{ user.lastname }}</h1>
      <h2> {{user.email }} </h2>
      <img v-bind:src="user.avatar">
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userCard {
  background-color: darkcyan;
}
</style>
