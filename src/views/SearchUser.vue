<template>
    <form @submit.prevent="submitSearch">
        <input type="text" v-model="searchValue" placeholder="search"/>
        <input type="submit" value="Search"/>
    </form>
    <div v-if="users" class="users">
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
        searchValue: '',
        users: null
    }
  },
  methods: {
      submitSearch() {
          UserService.searchUser(this.searchValue, 1)
          .then(response => {
              this.users = response.data
              Promise.all(
                Array.from({ length: response.headers['x-total-count'] / 10 >> 0 }, (v,k) => k + 1).forEach(i => {
                  UserService.searchUser(this.searchValue, i + 1)
                  .then(response => {
                    response.data.forEach(user => {
                      this.users.push(user)
                    })
                  })
                })
              )
              console.log(response.headers['x-total-count'])
          })
          .catch(error => {
              console.log(error)
          })
      }
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