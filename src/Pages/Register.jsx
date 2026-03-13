import SocialLogin from "../Components/SocialLogin";

const Register = () => {

    // handle data 
        const handleFormData = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
    }

  return (
    <div>
      <div className="hero min-h-[70vh]">
        <div className="card bg-base-100 w-full max-w-5xl shadow-2xl">
          <form onSubmit={handleFormData} className="card-body w-full">
            <h2 className="text-center text-2xl font-bold my-2">Login Now!</h2>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input w-full"
                placeholder="Email"
                autoComplete="email"
              />
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input w-full"
                placeholder="Password"
                autoComplete="current-password"
              />
              <div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
              </div>
              <SocialLogin></SocialLogin>
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
