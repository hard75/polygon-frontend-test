<template>
  <div>
      <header-component :cartLength="cartLength" />
      <router-view  @getCartLength="getCartLength"/>
  </div>
</template>

<script>
import 'materialize-css'
import M from 'materialize-css'
import HeaderComponent from './components/HeaderComponent.vue';
import axios from 'axios';

export default {
  components: {
    HeaderComponent
  },
  data() {
    return {
      cartLength: 0
    };
  },
  mounted() {
    M.AutoInit();
    this.getCartLength();
  },
  methods: {
    async getCartLength() {
      try {
        const response = await axios.get('car-items-length');
        this.cartLength = response.data.length;
      } catch (error) {
        console.error('Error in cart length', error);
      }
    }
  }
};
</script>
