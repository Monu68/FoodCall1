import RestaurantCard from "./RestaurantCard.js";
import {useState, useEffect} from "react";
import Shimmer from "./Shimmer.js";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Body = () =>{
    // locat state variable - super powerful variable
    const [listOfRestaurants, setlistOfRestaurants] = useState([]);
    const [filteredRestaurant, setfilteredRestaurant] = useState([]);
    const[searchText , setsearchText] = useState("");
        
    useEffect(() => {
        fetchData();
    } , []);

    const fetchData = async () =>{
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            );
            
            const json = await data.json();
        // optional chaining
        setlistOfRestaurants(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setfilteredRestaurant(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };
    console.log(listOfRestaurants)

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false)
        return (
            <h1>
                Looks like you're offline !! please check your internet connections
            </h1>
            );


    return listOfRestaurants.length === 0 ? <Shimmer/> : (      
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input type="text" 
                    className="border border-solid border-black" value={searchText}
                    onChange={(e) =>{
                        setsearchText(e.target.value);

                    }}/>
                    <button className="px-4 py-2 bg-gray-100 m-4 rounded-lg hover:bg-sky-200"
                    onClick={() =>{
                        //Filter the restaurant cards and update the UI
                        // searchText
                        console.log(searchText);
                        const filteredRestaurant = listOfRestaurants.filter(
                            (res) => res?.info?.name
                            ?.toLowerCase().includes(searchText.toLowerCase())
                        );

                        setfilteredRestaurant(filteredRestaurant);
                    }} >
                        Search</button>
                </div>
                <div className="search m-4 p-4 items-center ">
                <button 
                className="px-4 py-2 bg-gray-100 m-4 rounded-lg hover:bg-sky-200"
                onClick={() => {
                    //Filter logic here
                    const filteredList = listOfRestaurants.filter(
                        (res) => res.data.avgRating > 4
                    );
                    setlistOfRestaurants(filteredList);
                }
                }>
                    Top Rated Restaurants</button>
                </div>
            </div>
            <div className="flex flex-wrap">
                {filteredRestaurant?.map((restaurant) =>(
                   <Link key={restaurant?.info.id} 
                    to={"/restaurants/"+restaurant?.info.id}>
                        <RestaurantCard  resData={restaurant?.info}/>
                    </Link> 
                ))}
    
            </div>

        </div>
    );
};

export default Body;

// checking git