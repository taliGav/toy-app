import { toyService } from '../../services/toy-service.js';

export const toyStore = {
    state: {
        toys: null,
        isLoading: false,
        filterBy: {
            name: '',
            isInStock: false
        },
        // sortBy: 'name'
    },
    getters: {
        toys(state) {
            return state.toys;
        },
        isLoading(state) {
            return state.isLoading;
        },
        // toysToShow(state) {
        //     if (!state.filterBy) return state.toys;
        //     var toys = JSON.parse(JSON.stringify(state.toys));
        //     if (state.filterBy.txt) {
        //         console.log('filter.txt', state.filterBy.txt);
        //         const regex = new RegExp(state.filterBy.txt, "i");
        //         toys = toys.filter((toy) => regex.test(toy.name));
        //     }
        // if (state.filterBy.isInStock) {
        //     console.log('filter inStock', state.filterBy.isInStock);
        //     toys = toys.filter((toy) => toy.inStock === true);
        // }
        // return toys;
        // },
        toysCount({ toys }) {
            return toys.length;
        }
    },
    // cart(state) {
    //     return state.cart
    // },
    // cartLength(state) {
    //     return state.cart.length
    // },
    // cartTotal({ cart }) {
    //     return cart.reduce((acc, prd) => acc + prd.price, 0)
    // },
    mutations: {
        setToys(state, { toys }) {
            console.log('state mutation toys', toys);
            state.toys = toys;
        },
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading;
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
        // setFilter(state, { filterBy }) {
        //     state.filterBy = JSON.parse(JSON.stringify(filterBy));
        //     console.log('set filter mutations', state.filterBy);            
        // },
        removeToy(state, { id }) {
            const idx = state.toys.findIndex(toy => toy._id === id);
            state.toys.splice(idx, 1);
        },
        // setSort(state, { sortBy }) {
        //     state.sortBy = sortBy;
        //     console.log('state sort by' ,state.sortBy );
        // },
        // sortedToys(state) {
        //     if (!state.sortBy) return state.toys;
        //     var toys = state.toys;
        //     console.log("sorting by:0 ", state.sortBy);
        //     if (state.sortBy === "name") {
        //         console.log("sorting by:1 ", state.sortBy);
        //         toys = toys.sort((a, b) =>
        //             ("" + a[state.sortBy]).localeCompare("" + b[state.sortBy])
        //         );
        //     }
        //     if (state.sortBy === "createdAt") {
        //         console.log("sorting by:2 ", state.sortBy);
        //         toys = toys.sort(
        //             (a, b) => new Date(b[state.sortBy]) - new Date(a[state.sortBy])
        //         );
        //     }
        //     if (state.sortBy === "price") {
        //         console.log("sorting by:3 ", state.sortBy);
        //         toys = toys.sort((a, b) => b[state.sortBy] - a[state.sortBy]);
        //     }
        // },
        // addToCart(state, { toy }) {
        //     state.cart.unshift(toy)
        // },
        // removeFromCart(state, { toyId }) {
        //     const idx = state.products.findIndex(toy => toy._id === toyId)
        //     state.cart.splice(idx, 1)
        // },
        // clearCart(state) {
        //     state.cart = []
        // },
        saveToy(state, { toy }) {
            console.log('state', state.toys);
            console.log('saveToy mutation', toy);
            let toyId = toy._id;
            console.log('toyId', toyId);
            const idx = state.toys.findIndex(toy => toy._id === toyId);
            console.log('idx', idx);
            if (idx < 0) state.toys.push(toy);
            state.toys.splice(idx, 1, toy);

            console.log('state', state.toys);
        },
    },
    actions: {
        loadToys({ commit, state }) {
            toyService.query(state.filterBy).then((toys) => {
                console.log('toys' , toys);
                commit({ type: 'setToys', toys });
            });
        },
        // loadToys(context) {
        //     context.commit({ type: 'setIsLoading', isLoading: true });
        //     return toyService.query()
        //         .then(toys => {
        //             console.log('action toys', toys);
        //             context.commit({ type: 'setToys', toys });
        //         })
        //         .catch(err => {
        //             console.error('Cannot Load toys', err);
        //             throw err;
        //         })
        //         .finally(() => {
        //             context.commit({ type: 'setIsLoading', isLoading: false });
        //         });
        // },
        filter({ commit, dispatch }, { filterBy }) {
            // toyService.query(filterBy).then((toys) => {
            //   commit({type: 'setToys', toys});
            // });
            commit({ type: 'setFilter', filterBy });
            dispatch({ type: 'loadToys' });
        },
        saveToy(context, { toy }) {
            // if (toy._id) {
            //     return toyService.save(toy)
            //         .then(savedToy => {
            //             return savedToy;
            //         });
            //     } else {
            console.log('toy', toy);
            return toyService.save(toy)
                .then(savedToy => {
                    console.log('context.state.toys', context.state.toys);
                    console.log('savedToy', savedToy);
                    context.commit({ type: 'saveToy', toy: savedToy });
                    return savedToy;
                })
                .catch(err => {
                    console.error('Cannot Add Toy', err);
                    throw err;
                });

        },
        removeToy(context, payload) {
            // console.log('payload', payload);
            // console.log('payload.id', payload.id);
            return toyService.remove(payload.id)
                .then(() => {
                    context.commit(payload);
                })
                .catch(err => {
                    console.error('Cannot remove Toy', err);
                    throw err;
                });
        }
    }
};