import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const PrivateRoutes = () => {
    const navigate = useNavigate()
    const getCookies = new Cookies();
    const isCookieSet = getCookies.get('token');
    return (
        isCookieSet ? Outlet : navigate("/login")
    )
}

export default PrivateRoutes