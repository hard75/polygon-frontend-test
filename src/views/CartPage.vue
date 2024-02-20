<template>
  <div id="shopping" class="row container">
    <h3>Shopping Car</h3>
    <ul class="collection">
      <li v-for="item in car" :key="item.product.id" class="collection-item">
        <div class="row">
          <div class="col s2 car-img">
            <img
              width="50"
              height="50"
              :src="'http://localhost:3000/images/' + item.product.imageUrl"
              alt="Product Image"
            />
          </div>
          <div class="car-description col s5">
            <p>
              {{ item.product.name }} -
              <span>Quantity: {{ item.quantity }}</span>
            </p>
          </div>
          <div class="car-buttons col s5">
            <button
              @click="removeCarItem(item.id)"
              class="waves-effect waves-light btn red"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            car: []
        };
    },
    mounted() {
        this.fetchCarItems();
    },
    methods: {
         async fetchCarItems() {
            try {
                const response = await axios.get('car-items');
                this.car = response.data;
            } catch (error) {
                console.error('Error al obtener la lista de car item', error);
            }
        },
        async removeCarItem(itemId) {
          try {
            await axios.delete("remove-car-item/" + itemId);
            this.fetchCarItems();
            this.$emit('getCartLength');
          } catch (error) {
            console.error("Error al obtener la lista de car item", error);
          }
        }
    }
};
</script>

<style>
        .car-img {
  border-radius: 50%;
}

.car-description {
    font-weight: bold;
  text-align: left;
}

.car-description p span {
  color: #F44336;
}

.car-buttons {
  margin-top: 10px;
  display: flex;
  align-content: center;
  justify-content: center;
}

.car-detail {
  float: right;
}

.collection {
  margin-top: 20px;
}
</style>
