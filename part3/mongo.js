const mongoose = require('mongoose')
let add = false
let namePassed
let numberPassed

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length > 3) {
  add = true
  namePassed = process.argv[3]
  numberPassed = process.argv[4]
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.vkfybb8.mongodb.net/personApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    // console.log('connected')
    if (add) {
      const person = new Person({
        name: namePassed,
        number: numberPassed,
      })
      return person.save()
    } else {
      return Person.find({})
    }
  })
  .then((result) => {
    // console.log(result)
    if (add) {
      console.log(`added ${namePassed} number ${numberPassed} to phonebook`)
    } else {
      console.log("phonebook:")
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
    }
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))