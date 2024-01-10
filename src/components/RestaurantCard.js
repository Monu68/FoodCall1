import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData}= props;

    const{
        cloudinaryImageId,
        name,
        avgRating,
        cuisines,
        costForTwo,
        deliveryTime,
    } = resData ;

    return (
        <div className="m-2 p-4 w-[200px] rounded-lg bg-gray-100 hover:bg-gray-200">
            <img className="rounded-lg" 
            alt="res-logo" 
            src={CDN_URL+cloudinaryImageId} />
                <h3 className="font-bold py-3 text-lg   ">{name}</h3>
                <h4>{cuisines.join(", ")}</h4>
                <h4>{avgRating} stars</h4>
                <h4>{costForTwo / 100} FOR TWO</h4>
                <h4>{deliveryTime} minutes</h4>
        </div>
    );
};



export default RestaurantCard;