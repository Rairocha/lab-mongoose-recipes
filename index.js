const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
//let create1 = 
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(()=>
    Recipe.create({
      "title": "Lasagna",
      "level": "Amateur Chef",
      "ingredients": [
        "wheat",
        'Pound beef'
      ],
      "cuisine": "Italian",
      "dishType": "main_course",
      "duration": 120,
      "creator": "Chef Gatinha"
    })
    .then(r=>console.log(r.title))
    .catch(error=>console.error('Error connecting to the database', error))
  )
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.insertMany(data)
    .then(rec=>rec.forEach(r=>console.log(r.title)))
    .catch(error=>console.log(`An error ${error} happened`))
      })
  .then(()=>{
    Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100})
    .then(console.log('Change Made'))
    .catch(error=>console.log(`Error updating recipe${error}`))
  })
  //.then(()=>{
  //  console.log(Recipe.findOne({title:'Rigatoni alla Genovese'}))
  //})
  .then(()=>{
    Recipe.deleteOne({title:'Carrot Cake'})
    .then('Recipe Removed')
    .catch(error=>console.log(`Error deleting recipe ${error}`))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

 // mongoose.connection.close();
  // 
