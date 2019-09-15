require('./bootstrap');

window.Vue = require('vue')
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
new Vue({
    render: h => h(require('./components/Auth/Login.vue').default)
}).$mount('#login');