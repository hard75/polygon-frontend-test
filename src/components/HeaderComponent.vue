<template>
  <nav>
    <div class="nav-wrapper">
      <div class="row">
        <div class="col s6">
          <a style="cursor: pointer;" @click="() => {  this.$router.push('/'); }">
            <div class="row">
              <div class="col s2">
                <i style="font-size: 80px" class="large material-icons">store</i>
              </div>
              <div class="col s10">
                <p
                  style="font-size: 30px; color: white; margin: 0px; float: left"
                >
                  Tech Store
                </p>
              </div>
            </div>
          </a>
        </div>
        <div class="col s6">
          <span
            v-if="cartLength && cartLength > 0"
            style="font-weight: bold; color: #f44336; margin: 0px"
            class="new badge white"
          >
            {{ cartLength }}
          </span>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <a @click="() => {  this.$router.push('/cart'); }" style="padding: 0px !important">
                <i class="material-icons">shopping_cart</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    name: "HeaderComponent",
    props: {
        cartLength: {
            type: Number,
            required: true,
        }
    }
};
</script>
