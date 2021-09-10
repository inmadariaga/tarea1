<template>
    <div v-if="user" class="user">
        <h1 class="header">Mostrando informacion del usuario {{user.name}} {{user.lastName }}</h1>
        <div>
            <h4> Correo: {{ user.email }}</h4>
            <h4> Fecha de Nacimiento: {{ user.birthdate }} </h4>
        </div>
        <div>
            <img v-bind:src="user.avatar">
        </div>
        <div class="credit-cards">
            <h3>Tarjetas de credito</h3>
            <ul>
                <li class="item" v-for="card in creditCards" :key="card.id">
                    Numero de tarjeta: {{ card.creditCard }} <br> CVV: {{card.CVV }}
                </li>
            </ul>
        </div>
        <div class="addresses">
            <h3>Direcciones</h3>
            <ul>
                <li class="item" v-for="address in addresses" :key="address.id">
                    Direccion: {{ address.address }}
                    <CityCard :city="address.city"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import UserService from '@/services/UserService.js'
import CityCard from '@/components/CityCard.vue'

export default {
    props: ['id'],
    components: {
        CityCard
    },
    data() {
        return {
            user: null,
            creditCards: null,
            addresses: null
        }
    },
    created() {
        UserService.getUser(this.id)
        .then(response => {
            this.user = response.data
        })
        .catch(error => {
            console.log(error)
        });
        UserService.getUserCards(this.id)
        .then(response => {
            this.creditCards = response.data
        })
        .catch(error => {
            console.log(error)
        });
        UserService.getUserAddresses(this.id)
        .then(response => {
            this.addresses = response.data
        })
        .catch(error => {
            console.log(error)
        });
    }
}
</script>

<style scoped>
.user {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 1fr auto 3fr;
    grid-gap: 10px;
}
.header {
    grid-column: span 2;
}
.data {
    grid-column: span 2;
    display: grid;
    grid-template-columns: auto auto;
}
.credit-cards {
    background-color: burlywood;
}
.addresses {
    background-color: blue;
}
.item {
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 10px;
    border: 2px solid black;
}
</style>
