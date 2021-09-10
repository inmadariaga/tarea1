<template>
    <div class="city">
        <div>
            <h1> {{ city.name }} </h1>
            <h2> {{ city.country }} </h2>
        </div>
        <div>
            <h2> Usuarios con direccion registrada en la cuidad </h2>
            <UserCard v-for="user in users" :key="user.id" :user="user"/>
        </div>
    </div>
</template>

<script>
import UserService from '@/services/UserService.js'
import UserCard from '@/components/UserCard.vue'

export default {
    props: ['id'],
    components: {
        UserCard
    },
    data() {
        return {
            city: null,
            users: []
        }
    },
    created() {
        UserService.getCityDetails(this.id)
        .then(response => {
            this.city = response.data;
            Promise.all(response.data.users.forEach(id => {
                UserService.getUser(id)
                .then (response => {
                    this.users.push(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
            }))
        })
        .catch(error => {
            console.log(error)
        })
    }
}
</script>

<style scoped>
.city {
    display: grid;
    grid-template-columns: auto auto;
}
</style>
