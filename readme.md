# Wine Cellar API

We're going to create a Wine Cellar API! When you're done with your application, make a Pull Request against this repo.


### Setup

1. Create a Node/Express application. You can roll your own or use the [Galvanize Express Generator](https://github.com/gSchool/generator-galvanize-express).

1. Create a new database called `wine_cellar`. Create a `wines` table with the following columns: 
  > id, name, region, year, price, notes, rating

1. `brew install httpie` -- this will allow us to easily make curl requests


### Routes

Create the following routes and have them all return JSON. Below each route is an [httpie](https://github.com/jkbrzt/httpie) command that should return information from your application. You should also add status codes to the response, which you can do like so:

```javascript
res.status(200).json(
  // your information
);
```

* * *

`GET /api/wines`
* Returns all wines

  ```
  http http://localhost:3000/api/wines
  ```

* * *

`GET /api/wines/:id`
* Returns a wine by id
  
  ```
  http http://localhost:3000/api/wines/1
  ```

* * *

`POST /api/wines`
* Creates a new wine
  
  ```
  http --json POST http://localhost:3000/api/wines \
  rating=91 notes='Smooth, subtle finish' price=15.99 region=California year=2014
  ```

* * *

`PUT /api/wines/:id`
* Updates an existing wine by id
  
  ```
  http --json PUT http://localhost:3000/api/wines/1 rating=90
  ```

* * *

`DELETE /api/wines/:id`
* Deletes a wine by id
  
  ```
  http --json DELETE http://localhost:3000/api/wines/1
  ```


### Stretch Goals

* GET `/wines?year=1999` --> Returns all wines from 1999
* GET `/wines?min-rating=90&max-rating=95` --> Returns wines rated between 90 and 95
* GET `/wines?country=Spain` --> Returns wines from Spain