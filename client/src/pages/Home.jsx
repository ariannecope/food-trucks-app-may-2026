import "../App.css";
import {useState, useEffect} from 'react';


function Home() {
   // 1. State
   const [foodTrucks, setFoodTrucks] = useState([]);
  // 2. Effects (fetching data)
 useEffect(() => {
  async function getFoodTrucks() {
    // await fetch goes here
      // 1. fetch the data
      const response = await fetch("/api/get-all-food-trucks");
      // 2. convert response to JSON
       const data = await response.json();
      // 3. put data into state using setter function declared above.
      setFoodTrucks(data);
  }

  getFoodTrucks();
}, []);


  return (
    <>
    <h1>Total Food Trucks: {foodTrucks.length}</h1>

<div className="food-truck-container">
  {foodTrucks.map((truck) => (
    <div className="food-truck-card" key={truck.id}>
      <h2>{truck.name}</h2>
      <p>{truck.slogan}</p>
      <p>{truck.rating}</p>
      <p>📍 {truck.current_location}</p>
      <p>Today's Special: {truck.daily_special}</p>
      <p>Price Level: {truck.price_level}</p>
      <p>
  Vegan Options: {truck.has_vegan_options ? "Yes" : "No"}
</p>
    </div>
  ))}
</div>

    </>
  );
}

export default Home;
