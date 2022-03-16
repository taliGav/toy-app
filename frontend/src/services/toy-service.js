// NOTE: this is a synchronous service on purpose meant to simplify first intro to Vuex

// import {storageService} from './storage.service.js'
import { storageService } from './async-storage-service.js';
import axios from 'axios'

import { utilService } from './util-service.js';

const KEY = 'toys';

///////// TOYS DATA /////////

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Cars", "Puzzle", "Outdoor"];

// const toy = {
//     "_id": "t101",
//    "name": "Talking Doll",
//    "price": 123,
//    "labels": ["Doll", "Battery Powered", "Baby"],
//     "createdAt": 1631031801011,
//    "inStock": true
//    }

//////////////////////////////

const reviews = ['great toy', 'excellent'];

const TOY_KEY = 'toys';
const TOY_URL = '//localhost:3050/api/toy/';

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/toy'  : '//localhost:3325/api/toy/';


const gToys = [
    {
        _id: 't101',
        name: "Talking Doll",
        price: 112,
        labels: ["Doll", "Battery Powered", "Baby"],
        createdAt: new Date(),
        inStock: true
    },
    {
        _id: 't102',
        name: "Yo-Yo",
        price: 25,
        labels: ["Outdoor"],
        createdAt: new Date(),
        inStock: true
    },
    {
        _id: 't103',
        name: "Soccer Game Ball",
        price: 20,
        labels: ["Outdoor"],
        createdAt: new Date(),
        inStock: true
    },
    {
        _id: 't104',
        name: "Animal Puzzle - 1000 pcs",
        price: 70,
        labels: ["Box game", "Art", "Puzzle"],
        createdAt: new Date(),
        inStock: true
    },
    {
        _id: 't105',
        name: 'Race car',
        price: 40,
        labels: ["Cars", "Battery Powered", "On wheels"],
        createdAt: new Date(),
        inStock: true
    }];

export const toyService = {
    query,
    getById,
    remove,
    save,
    getNewToy
};

// DEBUG Technique
window.theToyService = toyService;
window.ss = storageService;

// TODO: support paging and filtering and sorting

function query(filterBy) {
    console.log('filterBy', filterBy);
    return axios.get(BASE_URL, {params: filterBy}).then((res) => res.data);
}
  
// function query() {
//     return axios.get(TOY_URL).then(res => res.data);
// }

function getById(id) {
    return axios.get(BASE_URL + id).then(res => {
        let toy = res.data
        console.log('toy in service', toy);
        toy.reviews = reviews;
        return toy;
    });
}

function remove(id) {
    return axios.delete(BASE_URL + id);
}

function save(toy) {
    const toyToSave = JSON.parse(JSON.stringify(toy));
    if (toyToSave._id) {
        return axios.put(BASE_URL + toyToSave._id, toyToSave);
    } else {
        return axios.post(BASE_URL, toyToSave);
    }
}

function getNewToy(_id = '', name = '', price= 100, labels = []) {
    return {
        _id,
        name,
        price,
        labels,
        createdAt: '',
        inStock: true
    };
}


// _createToys();


// function query() {
//     // return Promise.reject("NOT NOW!")
//     return axios.get(TOY_URL).query(TOY_KEY)
//     .then((toys)=>{
//         if(!toys || !toys.length) return _createToys()
//         else return toys
//     })

// function query() {
//     // return Promise.reject("NOT NOW!")
//     return axios.get(TOY_URL).query(TOY_KEY)
//     .then((toys)=>{
//         if(!toys || !toys.length) return _createToys()
//         else return toys
//     })

// const toys = JSON.parse(JSON.stringify(gToys))
// return Promise.resolve(toys);
// }


// function getById(id) {
//     return storageService.get(KEY, id);
//     return axios.get(TOY_URL + id);
// }


// function save(toy) {
//     // return Promise.reject("NOT NOW!")
//     const toyToSave = JSON.parse(JSON.stringify(toy));
//     const prm = (toyToSave._id) ? storageService.put(KEY, toy) : storageService.post(KEY, toy);

//     return prm;
// }


// function _createToys() {
//  return  storageService.postMany(KEY, gToys);
// }

// function _createToys1() {
//     var toys = storageService.load(KEY)
//     if (!toys || !toys.length) {
//     const toys =gToys;
//     // const toys = [getNewToy('t101', 'Talking Doll', ["Doll", "Battery Powered", "Baby"]), getNewToy('t102', 'Race car', ["Cars", "Battery Powered", "Boys"])];
//     // storageService.postMany(KEY, toys);
//     storageService.store(KEY,toys);
//     }
//     return toys;
// }

