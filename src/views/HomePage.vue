<template>
  <div>
    <div id="main" class="row">
      <div class="col s9">
        <div class="row">
          <div
            v-for="product in products"
            :key="product.id"
            class="col s12 m6 l4"
          >
            <div class="card hoverable">
              <div class="card-image">
                <img
                  :src="'http://localhost:3000/images/' + product.imageUrl"
                  alt="Product Image"
                />
              </div>
              <div class="card-content">
                <span class="card-title">{{ product.name }}</span>
                <span class="badge">{{ product.category.name }}</span>
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
                    <a
                      @click="() => { this.$router.push('/product/' + product.id) }"
                      class="modal-trigger btn-floating btn-large waves-effect waves-light"
                    >
                      <i class="material-icons">remove_red_eye</i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col s3">
        <div class="input-field">
          <input
            id="search"
            type="text"
            v-model="searchTerm"
            @input="searchProduct"
          />
          <label for="search">Search</label>
        </div>

        <div>
          <div class="input-field col s12">
            <select
              class="browser-default"
              v-if="categories.length > 0"
              @change="filterByCategory"
              v-model="selectedCategory"
            >
              <option value="0" selected>Filter by Category</option>
              <option
                v-for="category in categories"
                :key="category.id - 1"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      products: [],
      car: [],
      categories: [],
      selectedCategory: 0,
      searchTerm: "",
      currentSection: "main",
      sections: ["main", "details", "shopping"],
      selectedProduct: {
        name: "",
        description: "",
        availableStock: 0,
        imageUrl: "",
        price: 0,
        category: {
          name: "",
        },
      },
    };
  },
  mounted() {
    this.fetchProducts();
    this.fetchCategories();
  },
  methods: {
    async addToCar(product) {
      try {
        await axios.post("add-car-item", {
          productId: product.id,
          quantity: 1,
        });
        this.$emit('getCartLength');
      } catch (error) {
        console.error("Error al obtener la lista de car item", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get("categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error al obtener la lista de categories", error);
      }
    },
    async filterByCategory() {
      try {
        if (this.selectedCategory != 0) {
          const response = await axios.get(
            "/products/category/" + this.selectedCategory
          );
          this.products = response.data;
        } else {
          this.fetchProducts();
        }
      } catch (error) {
        console.error("Error in categories", error);
      }
    },
    async searchProduct() {
      try {
        const response = await axios.get("products/" + this.searchTerm);
        this.products = response.data.sort((a, b) => b.id - a.id);
      } catch (error) {
        console.error("error with product name", error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get("products");
        this.products = response.data.sort((a, b) => b.id - a.id);
      } catch (error) {
        console.error("Error al obtener la lista de productos", error);
      }
    },
  },
};
</script>

<style scoped>
#detail {
  display: none;
}

#shopping {
  display: none;
}
.row {
  margin: 0;
}

.card {
  margin-bottom: 20px;
  text-align: center;
}

.card .card-content .badge {
  background-color: #f44336;
  color: white;
  border-radius: 5px;
}

.card .card-image {
  margin-top: 13px;
  display: flex;
  align-content: center;
  justify-content: center;
}

.card img {
  width: 256px;
  height: 256px;
}

.car-img {
  border-radius: 50%;
}

.car-description {
  font-weight: bold;
  text-align: left;
}

.car-description p span {
  color: #f44336;
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
