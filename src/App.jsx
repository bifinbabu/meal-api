import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [searchKey, setSearchKey] = useState("");
  const [meals, setMeals] = useState();
  const [loading, setLoading] = useState(false); // New loading state

  const fetchData = async (searchKey) => {
    try {
      setLoading(true); // Set loading to true when fetching data
      let response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`
      );
      console.log("data", response.data);
      setMeals(response.data.meals);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  return (
    <>
      <div className="container">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          onChange={(e) => setSearchKey(e.target.value)}
          value={searchKey}
        />
        <button className="search-button" onClick={() => fetchData(searchKey)}>
          Search
        </button>
        {loading && <p>Loading...</p>}
        {meals ? (
          meals.length > 0 ? (
            meals.map((meal) => (
              <div className="meal-item" key={meal.idMeal}>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="meal-image"
                />
                <p className="meal-name">{meal.strMeal}</p>
                <div className="meal-video">
                  <iframe
                    width="100%"
                    height="315"
                    src={meal.strYoutube.replace("watch?v=", "embed/")}
                    title={meal.strMeal}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            ))
          ) : (
            <p>No meals found.</p>
          )
        ) : (
          <p>Error: Meals data is not available.</p>
        )}
      </div>
    </>
  );
}

export default App;
