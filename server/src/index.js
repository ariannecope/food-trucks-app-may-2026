// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

import express from "express";
import pg from "pg";
import config from "./config.js";

const db = new pg.Pool({
  connectionString: config.databaseUrl + "&uselibpqcompat=true",
  ssl: true,
});

const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllFoodTrucks()
async function getAllFoodTrucks() {
  const result = await db.query("SELECT * FROM food_trucks");
  return result.rows;
}

// 2. getFoodTruckById(id)
async function getFoodTruckById(id) {
  const result = await db.query("SELECT * FROM food_trucks WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
}

// 3. getVeganFoodTrucks()
// Gets all food trucks that offer vegan options
async function getVeganFoodTrucks() {
  const result = await db.query(
    "SELECT * FROM food_trucks WHERE has_vegan_options = true",
  );
  return result.rows; // array of truck objects with vegan options
}

// 4. getFoodTrucksByPrice(price)

//helper function to get food by price level - ranging from 1-5 as a scale with error handling to make sure user returns value between 1-5

async function getFoodTrucksByPrice(price) {
  if (price < 1 || price > 5) {
    throw new Error("Price level must be between 1 and 5");
  }
  const result = await db.query(
    "SELECT * FROM food_trucks WHERE price_level = $1",
    [price],
  );
  return result.rows;
}

// 5. getTopRatedFoodTrucks()--Arianne

//Helper Function for retrieving all food trucks with a rating of 4.5 or higher. 
//its asynchronous because querying the database takes time. async allows us to use await, which pauses this function until the database responds, without freezing the rest of the application.
//the () are empty of parameters because the function doesn't need any information from whoever calls it. 

async function getTopRatedFoodTrucks() {
  //Ask the database to run this SQL query. Wait until it finishes. Then store the database's response in a variable called result.
//db -- this represents your connection to PostgreSQL
//query -- a method that belongs to the db object
  const result = await db.query(`
    SELECT *
    FROM food_trucks
    WHERE rating >= 4.5;
  `);
//The backticks around the SQL query say, Javascript, don't try to execute this. Treat everything inside as plain text.

//return the rows that match the query
  return result.rows;
}



// 6. getFoodTrucksSortedByRating()

// Function to retrieve all food trucks from the database
// sorted by their rating from highest to lowest
async function getFoodTrucksSortedByRating() {
  //  a SQL query to select all food trucks
  // and order the results by the rating column in descending order
  const result = await db.query(
    "SELECT * FROM food_trucks ORDER BY rating DESC",
  );

  // Return only the rows containing the food truck data
  return result.rows;
}
// 7. getFoodTrucksSortedByPrice()
app.get("/get-food-trucks-sorted-by-price", async (req, res) => {
  const foodTrucks = await getFoodTrucksSortedByPrice();

  res.json(foodTrucks);
});
async function getFoodTrucksSortedByPrice() {
  const result = await db.query(
    "SELECT * FROM food_trucks ORDER BY price_level ASC"
  );

  return result.rows;
}


//     
// 8. getFoodTrucksCount()

// 9. addOneFoodTruck(...)
async function addOneFoodTruck(
  name,
  current_location,
  daily_special,
  slogan,
  has_vegan_options,
  price_level,
  rating,
) {
  const result = await db.query(
    `INSERT INTO food_trucks
     (name, current_location, daily_special, slogan, has_vegan_options, price_level, rating)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      name,
      current_location,
      daily_special,
      slogan,
      has_vegan_options,
      price_level,
      rating,
    ],
  );

  return result.rows[0];
}

// 10. deleteOneFoodTruck(id)
async function deleteOneFoodTruck(id) {
  const result = await db.query(
    "DELETE FROM food_trucks WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
}

// 11. updateFoodTruckLocation(id, newLocation)
async function updateFoodTruckLocation(id, newLocation) {
  await db.query("UPDATE food_trucks SET current_location =$1 WHERE id = $2", [
    id,
    newLocation,
  ]);
}

// 12. updateFoodTruckRating(id, newRating)
async function updateFoodTruckRating(id, newRating) {
  const result = await db.query(`
    UPDATE food_trucks
    SET rating = $2
    WHERE id = $1
    RETURNING *`,
    [id, newRating]
);
  return result.rows[0];
}
// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-food-trucks
app.get("/get-all-food-trucks", async (req, res) => {
  console.log("Route was hit!");
  const trucks = await getAllFoodTrucks();
  res.json(trucks);
});

// 2. GET /get-food-truck-by-id/:id - Carlotta
app.get("/get-food-truck-by-id/:id", async (req, res) => {
  const { id } = req.params;
  const truck = await getFoodTruckById(id);
  if (truck) {
    res.json(truck);
  } else {
    res.send(`Food truck with ID ${id} not found.`);
  }
});

//5. Get top-rated-food-trucks--Arianne
//Endpoint: Return all top-rated food trucks as JSON

//get is a method that doesn't retrieve the data itself. Instead, it registers an endpoint, like adding a new door to your server.
//So now if browser of postman requests GET /get-top-rated-food-trucks, Express knows exactly which function to run.
//async: This endpoint needs to wait for the helper function to finish talking to the database.
//req and res are parameters that express automatically provides whenever someone makes a request.

app.get("/get-top-rated-food-trucks", async (req, res) => {
  //call the helper function and store the results in a variable called foodTrucks
  const foodTrucks = await getTopRatedFoodTrucks();
  //res is the response object
  //.json is a method that tells express to convert the javascript value into JSON and sent it back to the client.
  res.json(foodTrucks);
});



// 6. GET /get-food-trucks-sorted-by-rating -  Morgan
// GET endpoint to retrieve all food trucks sorted by their rating
app.get("/get-food-trucks-sorted-by-rating", async (req, res) => {
  try {
    // Calls the helper function to get food trucks from the database
    // ordered from highest rating to lowest rating
    const foodTrucks = await getFoodTrucksSortedByRating();

    // Send a successful response (HTTP 200) with the food truck data as JSON
    res.status(200).json(foodTrucks);
  } catch (error) {
    // Logs the error in the server console for debugging
    console.error(error);

    // Send an error response (HTTP 500) if something goes wrong
    res.status(500).json({
      error: "Failed to retrieve food trucks.",
    });
  }
});
// 7. GET /get-food-trucks-sorted-by-price - Jana

// 8. GET /get-food-trucks-count - Meribel

// 9. POST /add-one-food-truck - Shirley
app.post("/add-one-food-truck", async (req, res) => {
  const {
    name,
    current_location,
    daily_special,
    slogan,
    has_vegan_options,
    price_level,
    rating,
  } = req.body;

  const truck = await addOneFoodTruck(
    name,
    current_location,
    daily_special,
    slogan,
    has_vegan_options,
    price_level,
    rating,
  );

  res.send(`Success! ${truck.name} was added!`);
});

// 10. POST /delete-one-food-truck/:id - Seth
app.post("/delete-one-food-truck/:id", async (req, res) => {
  const id = req.params.id;

  await deleteOneFoodTruck(id);
});
// 12. POST /update-food-truck-rating - BONUS! - ZESTY
app.post("/update-food-truck-rating", async (req, res) => {
  const {id, rating} = req.body;
  const truck = await updateFoodTruckRating(id, rating);
   res.send(`Success! ${truck.name}'s rating was updated to ${truck.rating}.`);
}); 
