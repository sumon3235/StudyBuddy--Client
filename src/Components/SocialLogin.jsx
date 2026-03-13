import useAuth from "../Providers/useAuth";

const SocialLogin = () => {

    const {googleLogin} = useAuth();

    return (
        <div className="text-center">
            <div className="divider">
                Or
            </div>
            <div>
                <button onClick={googleLogin} className="btn">
                    <img className="w-6" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" />
                    Continue With Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;