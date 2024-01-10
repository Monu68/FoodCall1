import { useState , useEffect } from "react";
import { Menu_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
    const [resInfo , setResInfo] = useState(null);

    useEffect(() => {
        fetchData();
    } , []);

    const fetchData = async () => {
        const data = await fetch(Menu_API + resId);
        console.log(data)
        const json = await data.json();
        setResInfo(json.data);
    };

    return resInfo;
};

export default useRestaurantMenu;