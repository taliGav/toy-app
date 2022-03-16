import { createStore } from 'vuex'

// import { userStore } from './modules/user-module.js'
import { toyStore } from './modules/toy-module.js'



const store = createStore({
// export const myStore = new Vuex.Store({
    strict: true,
    state: {
        count: 1030930,
    },
    getters: {
        countForDisplay(state) {
            return state.count.toLocaleString()
        },
    },
    mutations: {
        changeCount(state, payload) {
            console.log('Payload', payload);
            state.count += payload.by
        },
    },
    actions: {
        incLater(context) {
            setTimeout(() => {
                context.commit({ type: 'changeCount', by: 1 })
            }, 1000)
        },
    },
    modules: {
        // userStore,
        toyStore
    }
})


export default store

