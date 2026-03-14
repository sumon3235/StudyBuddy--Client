import { useLocation, useNavigate } from "react-router";
import useAuth from "../Providers/useAuth";
import toast from "react-hot-toast";

const SocialLogin = () => {

    const {googleLogin} = useAuth();
       const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/'

    const handleGoogleLogin = () => {
        googleLogin()
        .then( () => {
            toast.success('Login Succesful')
            navigate(from)
        })
        .catch( (err) => {
            toast.error(err.message)
        })
    }

    return (
        <div className="text-center">
            <div className="divider">
                Or
            </div>
            <div>
                <button type="button" onClick={handleGoogleLogin} className="btn">
                    <img className="w-6" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" />
                    Continue With Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;