const fs = require('fs');

// CRUDL : CREATE, READ, UPDATE, DELETE, LIST

const gToys = require('../data/toy.json');

// const PAGE_SIZE = 3

// function query(filterBy) {
//     const regex = new RegExp(filterBy.txt, 'i')
//     var toys = gToys.filter(toy => regex.test(toy.name))

//     if(filterBy.page){
//         startIdx = filterBy.page * PAGE_SIZE
//         toys = toys.slice(startIdx, startIdx + PAGE_SIZE)
//     }
//     return Promise.resolve(toys)
// }

function query(filterBy) {
    //   const regex = new RegExp(filterBy.name, 'i');
    //   var toys = gToys.filter((toy) => regex.test(toy.name));
    var toys = _filterToys(filterBy);
    return Promise.resolve(toys);
}


function getById(toyId) {
    const toy = gToys.find(toy => toy._id === toyId);
    return Promise.resolve(toy);
}

function remove(toyId) {
    const idx = gToys.findIndex(toy => toy._id === toyId);
    if (idx === -1) return Promise.reject('Toy not found');
    gToys.splice(idx, 1);
    return _saveToysToFile();
}

function save({ _id, name, price, labels, inStock }) {
    const toyToSave = {
        _id,
        name,
        price,
        labels,
        inStock,
        createdAt: new Date()
    };

    if (_id) {
        const idx = gToys.findIndex(toy => toy._id === _id);
        if (idx === -1) return Promise.reject('No such toy in gToys');
        gToys[idx] = toyToSave;
    } else {
        // CREATE
        toyToSave._id = _makeId();
        gToys.unshift(toyToSave);
    }
    return _saveToysToFile().then(() => toyToSave);
}

////// change name to txt /////
function _filterToys(filterBy) {
    var toys = gToys;
    console.log('toys in set query service', toys);

    let filteredToys = [];

    const regex = new RegExp(filterBy.name, 'i');

    // filter by name
    filteredToys = toys.filter((toy) => regex.test(toy.name));

    //filter by inStock
    if (filterBy.inStock) {
        console.log('toys in set query service inStock', filterBy.inStock);

        filteredToys = filteredToys.filter((toy) => {
            //   console.log('toy', toy.inStock);
            //   console.log('filterBy.inStock', filterBy.inStock);
            return toy.inStock === JSON.parse(filterBy.inStock);
        });
    }

    //filter by labels
    if (filterBy.labels.length) {
        console.log('toys in set query service filterBy.labels.length', filterBy.labels.length);

        filteredToys = filteredToys.filter((toy) => {
            // ["Doll", "Battery Powered", "Baby"]    ["Battery Powered", "Baby"]
            return toy.labels.some((label) => filterBy.labels.includes(label));
        });
    }

    //sorting
    if (filterBy.sortBy) {
        if (filterBy.sortBy === 'time')
            filteredToys = filteredToys.sort((t1, t2) => t1.createdAt - t2.createdAt);
        else if (filterBy.sortBy === 'price')
            filteredToys = filteredToys.sort((t1, t2) => t1.price - t2.price);
        else if (filterBy.sortBy === 'name')
            filteredToys = filteredToys.sort((t1, t2) => {
                return t1.name.toLowerCase() > t2.name.toLowerCase() ? 1 : -1;
            });
    }

    console.log('filteredToys in set query service inStock', filteredToys);

    return filteredToys;

}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

module.exports = {
    query,
    getById,
    remove,
    save
};