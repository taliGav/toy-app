const express = require('express');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const toyService = require('./services/toy.service');
const app = express();
const cors = require('cors');

app.use(express.static('public'));
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3325;


app.get('/', (req, res) => res.send('Hello!'));
// app.get('/hello', (req, res) => {

//     var visitCount = req.cookies.visitCount || 0;
//     visitCount++;
//     res.cookie('visitCount', visitCount)


//     res.send('Hello you')
// })
// app.get('/hi', (req, res) => res.redirect('/'))



app.get('/api/toy', (req, res) => {
    console.log('Backend getting your Toys');
    const filterBy = {
        name: req.query.name || '',
        labels: req.query.labels || [],
        inStock: req.query.isInStock || '',
        sortBy: req.query.sortBy || '',
    };
    console.log('filterBy in query server', filterBy);
    toyService.query(filterBy)
        .then(toys => {
            console.log('toys in set query server', toys);
            res.send(toys);
        });
});

app.put('/api/toy/:toyId', (req, res) => {

    // console.log('Backend Saving Toy:', req.query.name);
    const { _id, name, price, reviews, createdAt, labels = [], inStock = true } = req.body;
    const toy = {
        _id,
        name,
        price,
        labels,
        inStock,
        reviews,
        createdAt
    };

    toyService.save(toy)
        .then((savedToy) => {
            console.log('Backend Saving Toy:', savedToy);
            res.send(savedToy);
        })
        .catch((err) => {
            console.log('Backend had error: ', err);
            res.status(401).send('Cannot update Toy');
        });

});

app.post('/api/toy', (req, res) => {

    // const { nickname } = req.cookies
    // if(!nickname) return res.status(401).send('Please login')

    // console.log('Backend Saving Toy:', req.query.name);
    const { _id, name, price, reviews, labels = [], inStock = true } = req.body;
    const toy = {
        _id,
        name,
        price,
        labels,
        inStock,
        reviews
    };

    toyService.save(toy)
        .then((savedToy) => {
            console.log('Backend Saving Toy:', savedToy);
            res.send(savedToy);
        })
        .catch((err) => {
            console.log('Backend had error: ', err);
            res.status(404).send('Cannot create toy');
        });

});

app.get('/api/toy/:toyId', (req, res) => {
    console.log('Backend getting your Toy:', req.params.toyId);
    toyService.getById(req.params.toyId)
        .then(toy => {
            res.send(toy);
        })
        .catch((err) => {
            console.log('Backend had error: ', err);
            res.status(404).send('No such toy');
        });

});

app.delete('/api/toy/:toyId', (req, res) => {

    // const { nickname } = req.cookies
    // if(!nickname) return res.status(401).send('Please login')

    console.log('Backend removing Toy:', req.params.toyId);
    toyService.remove(req.params.toyId)
        .then(() => {
            res.send({ msg: 'Removed' });
        })
        .catch((err) => {
            console.log('Backend had error: ', err);
            res.status(404).send('Cannot remove Toy');
        });

});

// User

// app.post('/api/login', (req, res) => {

//     const { nickname } = req.body
//     res.cookie('nickname', nickname)
//     res.send(nickname)
//     console.log(nickname);
// })

// app.post('/api/logout', (req, res) => {

//     res.clearCookie('nickname')
//     res.end()
//     console.log('logging out');
// })


app.listen(port,
    () => console.log(`App listening on port ${port}!`));


    // app.listen(port,
    // () => console.log(`Server listening http://localhost:${PORT}/`));
