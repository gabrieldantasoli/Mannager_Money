import { Routes , Route } from "react-router-dom"
import { PrivateRoutes } from ".";

import Logged from "../Pages/Logged";
import Home from '../Pages/Home'
import PreLogin from '../Pages/PreLogin';
import LoginEmail from '../Pages/LoginEmail';
import Register from "../Pages/Register";
import About from "../Pages/About";

export default () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prelogin" element={<PreLogin />} />
            <Route path="/loginemail" element={<LoginEmail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />

            <Route path="/logged" element={<PrivateRoutes />} >
                <Route path="/logged" element={<Logged />} />
            </Route>

        </Routes>
    )
}