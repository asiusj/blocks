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
        activeBlocks: [],
        desktop: {
            width: 600,
            height: 400,
            object: null
        },
        overlay: false,
        activationProcess: {
            status: false,
            block: null,
            position: {
                x: null,
                y: null
            }
        },
        activationErrors: [],
        phantomBlockObject: null
    },
    mutations: {
        onChangeOverlay: (state, payload) => {
            state.overlay = payload
        },
        onChangeActivationStatus: (state, payload) => {
            state.activationProcess.status = payload.status
            state.activationProcess.block = payload.block ? payload.block : null
            state.activationProcess.position = payload.position
        },
        onBlockActivated: (state, payload) => {
            state.activeBlocks = [...state.activeBlocks, payload];
            state.availableBlocks[payload.type].count++;
            Vue.prototype.$bm.spreadThis(state.desktop.object)
        },
        onBlockDeleted: (state, payload) => {
            state.activeBlocks = state.activeBlocks.filter((val) => {
                if (val.id == payload) {
                    state.availableBlocks[val.type].count--;
                }
                return val.id != payload
            })
            Vue.prototype.$bm.spreadThis(state.desktop.object)
        },
        onBlockActivationError: (state, payload) => {
            state.activationErrors = [...state.activationErrors, payload]
        },
        setDesktop: (state, payload) => {
            state.desktop.object = payload
        },
        onPhantomMounted: (state, payload) => {
            state.phantomBlockObject = payload
        }
    },
    actions: {
        setOverlayStatus: (ctx, payload) => {
            ctx.commit("onChangeOverlay", payload)
        },
        setActivationStatus: (ctx, payload) => {
            ctx.commit("onChangeActivationStatus", payload)
            ctx.commit("onChangeOverlay", payload.status)
        },
        setPhantomObject: (ctx, payload) => {
            ctx.commit("onPhantomMounted", payload)
        },
        activateBlock: (ctx, payload) => {
            if (Vue.prototype.$bm.checkNewStatePossible(payload, ctx.state.desktop.object))
                ctx.commit("onBlockActivated", payload)
            else {
                let error = {
                    blockManagerMessage: "Cat't add this block now",
                    success: false,
                    lastObject: payload
                }
                ctx.commit("onBlockActivationError", error)
            }


        },
        deleteBlock: (ctx, payload) => {
            ctx.commit("onBlockDeleted", payload)
        },
    },
    getters: {
        getAvailableBlocks: state => {
            return state.availableBlocks
        },
        getActiveBlocks: state => {
            return state.activeBlocks
        },
        getDesktopParams: state => {
            return state.desktop
        },
        getOverlayStatus: state => {
            return state.overlay
        },
        getActivationProcess: state => {
            return state.activationProcess
        },
        getActivationErrors: state => {
            return state.activationErrors
        },
        getPhantomObject: state => {
            return state.phantomBlockObject
        }
    }
});