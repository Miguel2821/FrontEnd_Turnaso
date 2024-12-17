import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';



createApp(App).use(router).mount('#app');