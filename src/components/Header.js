import { LOGO_URL } from "../utils/constants";
import {useState} from "react";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () =>{
    const [btnNameReact , setbtnNameReact] = useState("Login")

    const onlineStatus = useOnlineStatus();

// subscribing to the store using a selector
    const cartItems = useSelector((store) => store.cart.items);

    return(
        <div className="flex justify-between bg-white shadow-lg">
            <div className="logo-container">
                <img className="w-28 mx-2" src={LOGO_URL}/>
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                   
                    <li className="px-5 font-semibold">
                        <Link to = "">Home</Link>
                    </li>
                    <li className="px-5 font-semibold">
                        <Link to = "/about">About us</Link>
                    </li>
                    <li className="px-5 font-semibold">
                        <Link to = "/contact">Contact Us</Link>
                    </li>
                    <button className="login font-semibold" onClick={() =>{
                        btnNameReact === "Login" 
                        ? setbtnNameReact("Logout")
                        : setbtnNameReact("Login");
                    }}>
                        {btnNameReact}
                    </button>
                    <li className="px-5 font-extrabold">
                        <Link to = "/cart">🛒 </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;