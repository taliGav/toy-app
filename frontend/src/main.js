import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/styles.scss'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')


import { focusDirective } from './directives'
// import { focusDirective, rainbowDirective, customOnDirective } from './directives'

app.directive('focus', focusDirective)
// app.directive('rainbow', rainbowDirective)
// app.directive('custom-on', customOnDirective)

// in Vue3 filters are deprecated and instead we need to use computed to get the same behavior.
// one way to make a computed globally is by app.config.globalProperties
app.config.globalProperties.$filters = {
  currencyUSD(amount) {
    // look implementation inside car-preview.vue
    return '$' + amount
  },
}