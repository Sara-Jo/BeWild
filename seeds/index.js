const mongoose = require('mongoose');
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect('mongodb://localhost:27017/BeWild', {useNewUrlParser: true, useUnifiedTopology: true});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    // 모든 DB 지우기
    await Campground.deleteMany({});
    // DB 200개 생성하기
    for (let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);      // 0 - 1000
        const randomPrice = Math.floor(Math.random() * 300 + 100);     // 100 - 400
        const camp = new Campground ({
            title: `${sample(descriptors)} ${sample(places)}`,
            price: randomPrice,
            location: `${cities[random1000].city}, ${cities[random1000].state}`
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
