const mongoose = require("mongoose");
const initData = require("./data.js");
const place = require("../models/place.js");
const path = require('path');
const layoutPath = path.resolve(__dirname, '../layouts/boilerplate.ejs'); // Adjust path as needed

const MONGO_URL="mongodb://127.0.0.1:27017/Hotel";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to db");

  try {
    await place.deleteMany({});
    await place.insertMany(initData.data);
    console.log("data was initialized");
  } catch (err) {
    console.error("Error initializing data:", err);
  }
}

main().then(()=>{
  // ... (Optional: Additional code to execute after database connection)
})
.catch(err => console.log(err));

module.exports = {
  // ... other configuration options
  // ...
  render: {
    // Assuming you're using a templating engine like ejs
    ejsOptions: {
      layout: layoutPath, // Pass the layout path here
    },
  },
};

// Call initDB after database connection is established (optional)
initDB();
