const knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'brianmsj',
        password: 'thinkful'
        database: 'recipify'
    },
});
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());


app.post('/recipes/', (req, res) => {
  const requiredFields = ['name', 'description'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const msg = `Missing ${field} in request body`
      console.error(msg);
      return res.status(400).send(msg);
    }
  }

    knex.insert({
      name: req.body.name,
      description: req.body.description,
    }).into('recipes')
    .then(recipe => res.status(201).json(recipe)
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'There is an issue'});
    });
});


app.get('/recipes/', (req, res) => {
  var recipeArray = [];
  knex.select('recipes.name', 'steps.step')
    .from('recipes')
    .join('steps', 'steps.recipe_id', 'recipes.id')
    .then(function(rows) {
      rows.forEach(row => {
        console.log(row);
      })
      // how are we running the server? Are we creating a runserver or closeserver function?
      // most efficient way to convert SQL table into a JSON object??
      //

    })
})
