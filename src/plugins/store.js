import Vue from "vue";
import Vuex from "vuex";
import {
    defaultBlocks
} from "@/models/block"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        availableBlocks: {
            ...defaultBlocks
        },
        activeBlocks: {}
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        getAvailableBlocks: state => {
            return state.availableBlocks
        },
        getActiveBlocks: state => {
            return state.activeBlocks
        }
    }
});