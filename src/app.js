import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Error from "./components/Error.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import { createBrowserRouter , Outlet, RouterProvider} from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import CartPage from "./components/CartPage.js"


const AppLayout = () =>{
return (

    <Provider store = {appStore}>
        
    <div clasName="app" >
        <Header/>
        <Outlet/>
    </div>
       
    </Provider>
   
    
);
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "/",
                element: <Body/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu/ >,
            },
            {
                path:"/cart",
                element: <CartPage/>,
            },
        ],
        errorElement: <Error/>,
    },
    
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router = {appRouter} />);
