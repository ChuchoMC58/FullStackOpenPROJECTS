const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://ChuchoMC:${password}@cluster0.y0dmeek.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const persSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', persSchema) 

const person = new Person({
  name: "eli",
  number: 424232,
})

const person2 = new Person({
    name: "luis",
    number: 2564,
  })

person.save().then(result => {
    console.log("person1 saved")
})
person2.save().then(result => {
    console.log("person2 saved")
    mongoose.connection.close()
})