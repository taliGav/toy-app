// import { storageService } from "./storage.service.js"

// const STORAGE_KEY = 'loggedinUser'

// export const userService = {
//     getLoggedinUser,
//     updateBalance,
//     addOrder,
//     changeOrderStatus
// }


// login()

// function login() {
//     const user = {fullname: 'Puki', balance: 200, orders: []}  
//     storageService.store(STORAGE_KEY, user)  
// }

// function getLoggedinUser() {
//     return storageService.load(STORAGE_KEY)
// }

// function updateBalance(amount) {
//     const user = getLoggedinUser();
//     if (user.balance + amount < 0) return Promise.reject("No Money")
//     user.balance += amount    
//     storageService.store(STORAGE_KEY, user) 
//     return Promise.resolve(user.balance)
// }
// function addOrder(order) {
//     const user = getLoggedinUser();
//     user.orders.unshift(order)
//     debugger
//     user.balance -= order.total
//     storageService.store(STORAGE_KEY, user) 
//     return Promise.resolve(order)
// }

// function changeOrderStatus(orderId, status) {
//     const user = getLoggedinUser();
//     const order = user.orders.find(order => order._id === orderId)
//     order.status = status
//     storageService.store(STORAGE_KEY, user) 
//     return Promise.resolve(order)
// }