import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';
import { createPinia } from 'pinia';
import { firebaseApp } from './plugins/firebase';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.use(router);
app.mount('#app');
