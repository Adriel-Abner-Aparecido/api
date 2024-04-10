require('dotenv').config()
const mongoose = require('mongoose');

async function main() {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("Conectou ao banco de dados!");
}
main().catch((err) => console.log(err));

module.exports = mongoose;