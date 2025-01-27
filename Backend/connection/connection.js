const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(  "mongodb+srv://preethu:preethu@cluster0.eksdofl.mongodb.net/panchayatapp?retryWrites=true&w=majority&appName=Cluster0" || process.env.MONGODB_URL)
.then(() => {
  console.log("DB is connected");
})
.catch((error) => {
  console.error('Error in connection', error);
});
