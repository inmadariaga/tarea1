<template>
    <form @submit.prevent="submitSearch">
        <input type="text" v-model="searchValue" placeholder="search"/>
        <input type="submit" value="Search"/>
    </form>
    <div v-if="cities" class="cities">
        <CityCard v-for="city in cities" :key="city.id" :city="city"/>
    </div>
</template>

<script>
// @ is an alias to /src
import CityCard from '@/components/CityCard.vue'
import UserService from '@/services/UserService.js'

export default {
  name: 'Cities',
  components: {
    CityCard
  },
  data() {
    return {
        searchValue: '',
        cities: null
    }
  },
  methods: {
      submitSearch() {
          UserService.searchCity(this.searchValue, 1)
          .then(response => {
              this.cities = response.data
              Promise.all(
                Array.from({ length: response.headers['x-total-count'] / 10 >> 0 }, (v,k) => k + 1).forEach(i => {
                  UserService.searchCity(this.searchValue, i + 1)
                  .then(response => {
                    response.data.forEach(city => {
                      this.users.push(city)
                    })
                  })
                })
              )
          })
          .catch(error => {
              console.log(error)
          })
      }
  }
}
</script>

<style scoped>
.cities{
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  grid-gap: 10px;
}
</style>