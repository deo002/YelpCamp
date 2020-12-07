const Campground = require('/home/dearsh/yelpcamp/model/campground.js');
const cities = require('./cities.js');
const { descriptors, places } = require('./seedHelpers.js');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database Connected!');
});

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; ++i) {
        const random1000 = Math.floor(Math.random() * 1000);
        const placerand = Math.floor(Math.random() * places.length);
        const descriptorrand = Math.floor(Math.random() * descriptors.length);
        const priceRand = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fc45ffad97d4b2af8eeb26a',
            title: `${descriptors[descriptorrand]} ${places[placerand]}`,
            location: `${cities[random1000]['city']}, ${cities[random1000]['state']}`,
            price: priceRand,
            images: [{
                url: 'https://res.cloudinary.com/douc4ze4x/image/upload/v1607086677/YelpCamp/bek6i3dlqzienhq5zw1g.jpg',
                filename: 'YelpCamp/bek6i3dlqzienhq5zw1g'
            },
            {
                url: 'https://res.cloudinary.com/douc4ze4x/image/upload/v1607086682/YelpCamp/uxhucpymbq2oropc2pjp.jpg',
                filename: 'YelpCamp/uxhucpymbq2oropc2pjp'
            }
            ],
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae consectetur vero eos molestias blanditiis nobis corporis, odio sit provident natus nisi aliquid fugiat et ex, reprehenderit expedita dicta nam est quibusdam. Dignissimos fuga ullam repellendus pariatur impedit animi magnam reiciendis, quaerat vitae aliquid voluptatum voluptates minima asperiores facilis cumque autem.'
        });
        await camp.save();
    }
}

seedDB();
