import ItemList from "./ItemList";
const RestaurantCategory = ({data}) => {
    return (
        <div>

        <ItemList items = {data.itemCards} />
        </div>
    );
};

export default RestaurantCategory;