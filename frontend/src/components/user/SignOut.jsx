import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const navigate = useNavigate();
    navigate('/');
    const [_, setCookies] = useCookies(['access_token']);
    setCookies('token', '');
    window.localStorage.removeItem('id');
};

export default SignOut;
