<template>
  <div class="cities">
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
      cities: []
    }
  },
  created() {
    UserService.getCities(1)
    .then(response => {
      Promise.all(
        Array.from({ length: (response.headers['x-total-count'] / 10 >> 0) + 1 }, (v,k)=> k + 1).forEach(i => {
          UserService.getCities(i)
          .then(response => {
            response.data.forEach(city => {
              this.cities.push(city)
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
.cities{
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  grid-gap: 10px;
}
</style>