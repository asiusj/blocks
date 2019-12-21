import Vue from 'vue'
import App from './App.vue'
import "./plugins/bootstrap-vue"
import bm from "./plugins/block-manager"
import store from "./plugins/store"
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

Vue.use(bm, {
    gap: 5,
    store: store
})

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')