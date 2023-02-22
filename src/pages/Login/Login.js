import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const{setUser}=useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    fetch(`http://crm.softvalley.sveducrm.com/api/admin/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("soft-valley")}`,
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `Bearer ${localStorage.getItem("soft-valley-token")}`,
        // },
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("This is from login with login data",data.data.user);
        if(data.success){
          window.localStorage.setItem("soft-valley", data.data.token);
          setUser(data.data.user);
          navigate('dashboard/leads');
        }
      });
  };

  return (
    <div>
      <div className="hero min-h-screen ">
        <div className="lg:w-[50%] md:w-[70%] sm:w-[80%] w-[90%]">
          <div className="text-center text-xl mb-6">LOGIN</div>
          <div className="card flex-shrink-0 w-full  bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
