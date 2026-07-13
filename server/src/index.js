console.log("Running:", import.meta.filename);
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

// 3. getVeganFoodTrucks()

// 4. getFoodTrucksByPrice(price)

// 5. getTopRatedFoodTrucks()

// 6. getFoodTrucksSortedByRating()

// 7. getFoodTrucksSortedByPrice()

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

// 12. updateFoodTruckRating(id, newRating)

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-food-trucks
app.get("/get-all-food-trucks", async (req, res) => {
  console.log("Route was hit!");
  const trucks = await getAllFoodTrucks();
  res.json(trucks);
});

// 2. GET /get-food-truck-by-id/:id - Ysabel

// 3. GET /get-vegan-food-trucks - Shirley

// 4. GET /get-food-trucks-by-price/:price - ?

// 5. GET /get-top-rated-food-trucks - Morgan

// 6. GET /get-food-trucks-sorted-by-rating - Zesty Pepper

// 7. GET /get-food-trucks-sorted-by-price - Jana

// 8. GET /get-food-trucks-count - Hailey

// 9. POST /add-one-food-truck
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

  res.send(`Success! ${id} was deleted.`);
});

// 11. POST /update-food-truck-location - Arianne

// 12. POST /update-food-truck-rating - BONUS!

// ------DB SCHEMA-------------
// CREATE TABLE food_trucks (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR NOT NULL,
//     current_location VARCHAR,
//     daily_special VARCHAR,
//     slogan VARCHAR,
//     has_vegan_options BOOLEAN DEFAULT false,
//     price_level INTEGER DEFAULT 2 CHECK (price_level BETWEEN 1 AND 5),
//     rating DECIMAL(2,1) DEFAULT 4.0 CHECK (rating BETWEEN 0 AND 5)
// );
