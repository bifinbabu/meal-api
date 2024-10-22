import { useState } from "react";
import loadingGif from "./assets/148.gif";
import "./App.css";
import axios from "axios";

function App() {
  const [searchKey, setSearchKey] = useState("");
  const [meals, setMeals] = useState();
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchData = async (searchKey) => {
    try {
      setLoading(true);
      setIsInitialLoad(false);
      setMeals(null);
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
        {loading && (
          <div className="loading">
            <img src={loadingGif} alt="Loading..." />
          </div>
        )}
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
              <p className="message error">
                No meals found. Please try a different search.
              </p>
            )
          ) : !loading ? (
            isInitialLoad ? (
              <p className="message welcome">
                Try searching something to get started
              </p>
            ) : (
              <p className="message error">
                Oops! No meals found. Please try a different search.
              </p>
            )
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
