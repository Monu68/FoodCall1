import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items, dummy }) => {
    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        //Dispatch an action
        dispatch(addItem(item));
    };
    return (
    <div>

        {items.map((item) => (
        <div key={item.card.info.id}
        
        >
            
           
            <div className="static w-6/12 h-32 p-5 mx-auto my-4 bg-white border-b-2 flex justify-between ">
           
                <div className="text-left w-9/12">
                    <span className="font-medium text-lg">{item.card.info.name}</span>
                    <p >
                        {" "} 
                        ₹{" "} 
                    {item.card.info.price
                        ? Math.floor(item.card.info.price / 100)
                        : Math.floor(item.card.info.dafaultPrice /100)}
                    </p>
                
                <p className="text-xs py-2 text-left">{item.card.info.description}</p>
                </div>
                
            <div absolute>
                <img src={CDN_URL + item.card.info.imageId} className="h-auto max-w-xs w-28"/>
                <div>
                <button className="p-1 bg-white shadow-xl rounded hover:bg-gray-200"
                onClick = {() => handleAddItem(item)}
                > Add + </button>
                </div>
            </div>
            </div>
        </div>
    ))}
    </div>
        
    );
};


export default ItemList;