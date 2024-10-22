import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [searchKey, setSearchKey] = useState("");
  const [meals, setMeals] = useState();

  const fetchData = async (searchKey) => {
    try {
      let response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`
      );
      console.log("data", response.data);
      setMeals(response.data.meals);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <div style={{ padding: 10 }}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchKey(e.target.value)}
          value={searchKey}
        />
        <button onClick={() => fetchData(searchKey)}>Search</button>
        {meals?.length > 0 && (
          <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img
                src={meals[0].strMealThumb}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <p style={{ marginTop: "50px" }}>{meals[0].strMeal}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
