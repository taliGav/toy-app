// import { utilService } from './../../services/util-service.js'
// import { userService } from './../../services/user-service.js'
// // import { showMsg } from './../../services/event-bus.service.js'



// export const userStore = {
//     state: {
//         user: userService.getLoggedinUser(),
//     },
//     getters: {
//         user(state) {
//             return state.user
//         }
//     },
//     mutations: {
//         updateOrder(state, { order }) {
//             const idx = state.user.orders.findIndex(currOrder => currOrder._id === order._id)
//             state.user.orders.splice(idx, 1, order)
//         },
//         setUserBalance(state, { balance }) {
//             state.user.balance = balance
//         },
//         addOrder(state, { order }) {
//             state.user.orders.unshift(order)
//         },
//     },
//     actions: {
//         deposit(context, { amount }) {
//             return userService.updateBalance(amount)
//                 .then(balance => {
//                     context.commit({
//                         type: 'setUserBalance',
//                         balance
//                     })
//                     return balance
//                 })
//                 .catch(err => {
//                     console.error('Cannot deposit', err)
//                     throw err
//                 })
//         },
//         // checkout({ state, rootGetters, commit }) {
//         checkout({ state, rootGetters, commit }) {
//             // console.log('CONTEXT', context);
//             const total = rootGetters.cart.reduce((acc, prd) => acc + prd.price, 0)
//             if (state.user.balance < total) {
//                 // showMsg('Please deposite', 'danger')
//                 return
//             }
//             const order = {
//                 _id: utilService.makeId(),
//                 createdAt: Date.now(),
//                 items: rootGetters.cart,
//                 total,
//                 status: 'PENDING'
//             }
//             userService.addOrder(order)
//                 .then(savedOrder => {
//                     commit({ type: 'clearCart' })
//                     commit({ type: 'addOrder', order: savedOrder })
//                     commit({ type: 'setUserBalance', balance: state.user.balance - total })
//                 })
//                 .catch(err => {
//                     console.error('Cannot checkout', err)
//                     throw err
//                 })
//         },
//         setOrderStatus(context, { orderId, status }) {
//             userService.changeOrderStatus(orderId, status)
//                 .then(order => {
//                     context.commit({ type: 'updateOrder', order })
//                 })

//         },
//     }
// }