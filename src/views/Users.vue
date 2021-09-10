<template>
  <div class="users">
    <UserCard v-for="user in users" :key="user.id" :user="user"/>
  </div>
</template>

<script>
// @ is an alias to /src
import UserCard from '@/components/UserCard.vue'
import UserService from '@/services/UserService.js'

export default {
  name: 'Users',
  components: {
    UserCard
  },
  data() {
    return {
      users: []
    }
  },
  created() {
    UserService.getUsers(1)
    .then(response => {
      Promise.all(
        Array.from({ length: (response.headers['x-total-count'] / 10 >> 0) + 1 }, (v,k)=> k + 1).forEach(i => {
          UserService.getUsers(i)
          .then(response => {
            response.data.forEach(user => {
              this.users.push(user)
            })
          })
          .catch(error => {
            console.log(error)
          })
        })
      )
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
.users {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto auto auto;
}
</style>