require('./bootstrap');
window.Vue = require('vue');
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
import {Loading,Message} from 'element-ui';
Vue.prototype.$message = Message;
new Vue({
    render: h => h(require('./components/clock/index').default)
}).$mount('#clock')