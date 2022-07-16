import { createApp } from 'vue';
import naive from 'naive-ui';
import App from './App.vue';
import Router from './router';
import store from './store';
import 'tailwindcss/tailwind.css';

const app = createApp(App);

// 挂载Router
app.use(Router);

// 挂载pinia
app.use(store);

// 挂载naive
app.use(naive);

app.mount('#app');
