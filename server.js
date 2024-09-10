const express = require('express')
const app = express()

// Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Sup, ${username}!`)
});

// Rolling the Dice
app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number, 10)
    if (isNaN(number)) {
        return res.send('You must specify a number.');
    }
    const roll = Math.floor(Math.random() * number);
    res.send(`You rolled a ${roll}`);
})

// I Want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS_IS', price: 0.99 }
]

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    if (index >= collectibles.length || index < 0) {
        return res.send('No such item, Check back soon!');
    }
    const item = collectibles[index]
    res.send(`Oh yeah? you want ${item.name} baby? For $${item.price}, it could be yours baby!`)
})

// Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;
    if (req.query.minPrice) {
        const minPrice = parseFloat(req.query.minPrice)
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
    if (req.query.maxPrice) {
        const maxPrice = parseFloat(req.query.maxPrice)
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
    if (req.query.type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === req.query.type);
    }
    res.json(filteredShoes)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000 baby!')
})