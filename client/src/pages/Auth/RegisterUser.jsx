import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import vit from "../../assets/vit-bd.jpg";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //check Error
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const { _id } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (_id) {
      navigate("/");
    }
  }, [_id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseRegex = /[A-Z]/;

    if (username === "") {
      setUsernameError("Hãy nhập username");
    }
    if (email === "") {
      setEmailError("Hãy nhập email");
    }
    if (password === "") {
      setPasswordError("Hãy nhập password");
    }
    if (confirmPassword === "") {
      setConfirmPasswordError("Hãy nhập confirm password");
    }

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Hãy điền đầy đủ thông tin trước khi đăng ký");
    }

    //check Detail Username
    if (username.length <= 5 && username !== "") {
      return setUsernameError("Hãy nhập nhiều hơn 6 ký tự");
    }

    //check Detail Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && email !== "") {
      return setEmailError("Email phải bao gồm @");
    }

    //check Detail Password
    if (password.length <= 7 && password !== "") {
      return setPasswordError("Password phải lớn hơn 8 ký tự");
    }
    if (
      (!specialCharacterRegex.test(password) ||
        !uppercaseRegex.test(password)) &&
      password !== ""
    ) {
      return setPasswordError(
        "Mật khẩu phải chứa ký tự đặc biệt và chữ in hoa"
      );
    }

    //check Detail Password
    if (
      password !== confirmPassword &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      return toast.error("Mật khẩu không giống nhau - Xin nhập lại");
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ _id: res._id, role: res.role }));
      toast.success("Đăng ký thành công");
      console.log(res);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="bg-white w-[50%] flex rounded shadow-md x:w-[95%] 2xl:w-[60%] xl:w-[80%] lg:w-[90%]  x:max-md:items-center x:max-md:justify-center">
        <div className="w-full max-w-md p-6 rounded-lg space-y-5 ">
          <div className="w-full flex flex-col items-center space-y-5 ">
            <h1 className="text-3xl font-semibold">Create an Account</h1>
            <h3 className="text-sm font-semibold text-gray-500">
              Join for exclusive access
            </h3>
          </div>
          <form className="w-full space-y-5">
            {/* Username */}
            <div className="flex flex-col w-full space-y-2 ">
              <label className={usernameError ? "text-red-500" : ""}>
                {usernameError ? usernameError : "Username"}
              </label>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError(null);
                }}
                type="text"
                className="w-full h-[40px] border border-gray-250 rounded-lg px-3"
                placeholder="Username"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col w-full space-y-2">
              <label className={emailError ? "text-red-500" : ""}>
                {emailError ? emailError : "Email"}
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(null);
                }}
                type="email"
                placeholder="Email"
                className="w-full h-[40px] border border-gray-250 rounded-lg px-3"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col w-full space-y-2">
              <label className={passwordError ? "text-red-500" : ""}>
                {passwordError ? passwordError : "Password"}
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(null);
                }}
                type="password"
                placeholder="Password"
                className="w-full h-[40px] border border-gray-250 rounded-lg px-3"
              />
            </div>

            {/* ConfirmPassword */}
            <div className="flex flex-col w-full space-y-2">
              <label className={confirmPasswordError ? "text-red-500" : ""}>
                {confirmPasswordError
                  ? confirmPasswordError
                  : "Confirm Password"}
              </label>
              <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError(null);
                }}
                type="password"
                placeholder="ConfirmPassword"
                className="w-full h-[40px] border border-gray-250 rounded-lg px-3"
              />
            </div>

            {/* Button Submit */}
            <div>
              <button
                onClick={handleSubmit}
                className="w-full h-[40px] border border-gray-250 rounded-lg mt-4 bg-blue-500 text-white font-semibold"
              >
                Create an Account
              </button>
            </div>
            <div>
              <Link to={"/login"}>
                <button className="w-full h-[40px] border border-gray-250 rounded-lg ">
                  Sign In
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className="w-full hidden md:block">
          <div className="w-full h-full flex items-center justify-center p-6 ">
            <img src={vit} className="object-cover w-full h-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
