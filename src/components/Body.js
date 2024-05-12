import RestaurantCard from "./RestaurantCard.js";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Body = () => {
  // locat state variable - super powerful variable
  const [listOfRestaurent, setlistOfRestaurent] = useState([]); // setting empty as default
  const [filteredRestaurent, setFilteredRestaurent] = useState([]);
  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.89960&lng=80.22090&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTINGR"
    );
    const json = await data.json();
    console.log(json);

    setlistOfRestaurent(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurent(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  if (listOfRestaurent !== undefined && listOfRestaurent?.length === 0) {
    return <Shimmer />; // calling shimer components
  }

  //console.log(listOfRestaurants);

  //   const onlineStatus = useOnlineStatus();

  //   if (onlineStatus === false)
  //     return (
  //       <h1>
  //         Looks like you're offline !! please check your internet connections
  //       </h1>
  //     );

  return listOfRestaurent.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-gray-100 m-4 rounded-lg hover:bg-sky-200"
            onClick={() => {
              //Filter the restaurant cards and update the UI
              // searchText
              console.log(searchText);
              const filteredRestaurent = listOfRestaurent.filter((res) =>
                res?.info?.name
                  ?.toLowerCase()
                  .includes(searchText.toLowerCase())
              );

              setFilteredRestaurent(filteredRestaurent);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 items-center ">
          <button
            className="px-4 py-2 bg-gray-100 m-4 rounded-lg hover:bg-sky-200"
            onClick={() => {
              //Filter logic here
              const filteredList =  listOfRestaurent.filter(
                (res) => res.data.avgRating > 4
              );
              setlistOfRestaurent(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurent?.map((restaurant) => (
          <Link
            key={restaurant?.info.id}
            to={"/restaurants/" + restaurant?.info.id}
          >
            <RestaurantCard resData={restaurant?.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;

// checking git
