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
            author: "61836dea7f50b4d7bb57311e",      // set the author of existing campgrounds to an user id
            title: `${sample(descriptors)} ${sample(places)}`,
            price: randomPrice,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dzacyhljo/image/upload/v1639117397/BeWild/mire98z0ziagajp7pyz8.jpg",
                    filename: "BeWild/mire98z0ziagajp7pyz8"
                },
                {
                    url: "https://res.cloudinary.com/dzacyhljo/image/upload/v1639117396/BeWild/eytozbpmqybzwjrt26yo.jpg",
                    filename: "BeWild/eytozbpmqybzwjrt26yo"
                }
            ],
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis eros ut finibus dignissim. Mauris vulputate elit eu nisl molestie commodo."
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
