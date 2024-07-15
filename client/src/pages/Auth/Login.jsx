import React, { useEffect, useState } from "react";
import vit from "../../assets/vit-bd.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  //CheckError
  const [errorAccount, setErrorAccount] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (_id) {
      navigate("/");
    }
  }, [navigate, _id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (account === "") {
      setErrorAccount("Hãy điền tài khoản vào");
    }

    if (password === "") {
      setErrorPassword("Hãy nhập mật khẩu vào");
    }

    try {
      const res = await login({
        email: account,
        username: account,
        password,
      }).unwrap();
      console.log(res);
      dispatch(setCredentials({ _id: res._id, role: res.role }));
      toast.success("Login Success");
      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  };
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-white w-[50%] h-[60%] flex rounded shadow-md x:w-[90%] 2xl:w-[60%] xl:w-[80%] md:w-[90%] x:max-md:items-center x:max-md:justify-center">
          <div className="w-full hidden md:block">
            <div className="w-full h-full flex items-center justify-center  p-6 ">
              <img
                src={vit}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
          <div className="w-full max-w-md p-6 rounded-lg space-y-5 ">
            <div className="w-full flex flex-col items-center space-y-5 ">
              <h1 className="text-3xl font-semibold">Sign In</h1>
              <h3 className="text-sm font-semibold text-gray-500">
                Unlock your world
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="w-full space-y-5">
              {/* Email */}
              <div className="flex flex-col w-full space-y-2">
                <label className={errorAccount ? "text-red-600" : ""}>
                  {errorAccount ? errorAccount : "Account"}
                </label>
                <input
                  type="account"
                  onChange={(e) => {
                    setAccount(e.target.value.toLowerCase());
                    setErrorAccount(null);
                  }}
                  placeholder="Username or Email"
                  className="w-full h-[40px] border border-gray-250 rounded-lg px-3"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col w-full space-y-2">
                <label className={errorPassword ? "text-red-600" : ""}>
                  {errorPassword ? errorPassword : "Password"}
                </label>
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorPassword(null);
                  }}
                  placeholder="Password"
                  className="w-full h-[40px] border border-gray-250 rounded-lg px-3"
                />
              </div>

              {/* Button Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full h-[40px] border border-gray-250 rounded-lg mt-4 bg-blue-500 text-white font-semibold "
                >
                  <div className="w-full flex justify-center">
                    {isLoading ? <Loader /> : "Login"}
                  </div>
                </button>
              </div>
              <div>
                <Link to={"/registerUser"}>
                  <button className="w-full h-[40px] border border-gray-250 rounded-lg ">
                    Create an Account
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
