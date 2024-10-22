import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchKey, setSearchKey] = useState("");
  const [meals, setMeals] = useState();
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState({});

  const fetchData = async (searchKey) => {
    try {
      setLoading(true);
      let response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`
      );
      console.log("data", response.data);
      setMeals(response.data.meals);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoLoad = (id) => {
    setVideoLoading((prev) => ({ ...prev, [id]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(searchKey);
  };

  return (
    <>
      <div className="container">
        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for meals..."
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        {loading && <p className="loading">Loading...</p>}
        <div className="results-container">
          {meals ? (
            meals.length > 0 ? (
              meals.map((meal) => (
                <div className="meal-card" key={meal.idMeal}>
                  <div className="meal-info">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="meal-image"
                    />
                    <p className="meal-name">{meal.strMeal}</p>
                  </div>
                  <div className="meal-video">
                    {videoLoading[meal.idMeal] ? (
                      <p>Video is loading...</p>
                    ) : (
                      <iframe
                        width="100%"
                        height="200"
                        src={meal.strYoutube.replace("watch?v=", "embed/")}
                        title={meal.strMeal}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        onLoad={() => handleVideoLoad(meal.idMeal)}
                      ></iframe>
                    )}
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
      </div>
    </>
  );
}

export default App;
