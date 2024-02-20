<template>
  <div id="product-detail" class="container">
    <div class="card hoverable">
      <div class="card-image">
        <img
          :src="'http://localhost:3000/images/' + product.imageUrl"
          alt="Product Image"
        />
      </div>
      <div class="card-content">
        <h1 class="card-title">{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <p style="margin-bottom:5px;font-weight:bold;">Category: <span style="color:white;background-color:#2bbbad;" class="badge">{{ product.category.name }}</span></p>
        <p style="font-weight:bold;">In Stock: <span style="color:white;" class="badge red">{{ product.availableStock }}</span></p>        
      </div>
      <div class="card-action">
        <div class="row">
          <div class="col s12 m6">
            <a
              @click="addToCar(product)"
              class="btn-floating btn-large waves-effect waves-light red"
            >
              <i class="material-icons">shopping_cart</i>
            </a>
          </div>
          <div class="col s12 m6">
            <a style="margin-top:10px;float:right;" @click="() => {  this.$router.push('/'); }" class="waves-effect waves-light btn">Back</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: {
        name: "",
        description: "",
        imageUrl: "",
        availableStock: 0,
        price: 0,
        category: {
          name: "",
        },
      },
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await axios.get("product/" + this.id);
        this.product = response.data;
      } catch (error) {
        console.error("Error al obtener la lista de car item", error);
      }
    }
  },
};
</script>

<style>  
  #product-detail .card .card-content .card-title {
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

   #product-detail .card .card-image{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

   #product-detail .card .card-image img {
    width: 30% !important;
  }
</style>