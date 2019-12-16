import Vue from 'vue'
import App from './App.vue'
import "./plugins/bootstrap-vue"
import bm from "./block-manager"
import store from "./plugins/store"


Vue.use(bm, {
    gap: 5,
    store: store
})

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')