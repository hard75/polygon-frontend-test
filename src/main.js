import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router';

import 'material-design-icons/iconfont/material-icons.css';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

import './assets/styles.css'

axios.defaults.baseURL = 'http://localhost:3000/api/'

createApp(App)
  .use(router)
  .mount('#app');

