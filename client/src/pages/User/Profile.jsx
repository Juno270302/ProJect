import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MenuUser from "../../components/MenuUser";
import { useSelector } from "react-redux";
import vit from "../../assets/vit-bd.jpg";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/userApiSlice";
import { useNavigate } from "react-router";

const Profile = () => {
  const { data: profile, refetch } = useProfileQuery();

  const [email, setEmail] = useState(profile?.email || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [fullname, setFullname] = useState(profile?.fullname || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile] = useUpdateProfileMutation();
  const navigate = useNavigate();

  const { _id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (profile && profile._id) {
      setEmail(profile?.email);
      setUsername(profile?.username);
      setFullname(profile?.full_name);
      setPhone(profile?.phone_number);
      refetch();
    }
  }, [profile, profile?.full_name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password không trùng nhau");
    }

    try {
      const res = await updateProfile({
        username,
        email,
        full_name: fullname,
        phone_number: phone,
        password,
      }).unwrap();
      console.log(res);
      setPassword("");
      setConfirmPassword("");
      toast.success("Thay đổi thông tin thành công");
      navigate("/");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error(error.data.message);
    }
  };

  return (
    <div className="w-full flex ">
      <MenuUser data={profile} />
      <div className="w-full my-5 px-3 ">
        <div className="w-full h-[70%] bg-white/40 rounded-xl shadow-xl b">
          <div className="w-[25%] px-5 py-5">
            <div className="font-bold text-2xl">Infor User</div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full px-5 py-5 flex flex-row  "
          >
            <div className=" flex w-[50%] flex-col items-center space-y-5 ">
              <div className="flex flex-col">
                <label className="font-semibold text-lg">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="px-3 py-2.5 rounded-lg border shadow-lg w-[400px]"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-lg">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="px-3 py-2.5 rounded-lg border shadow-lg w-[400px]"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-lg">Full Name</label>
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  type="text"
                  className="px-3 py-2.5 rounded-lg border shadow-lg w-[400px]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-lg">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  className="px-3 py-2.5 rounded-lg border shadow-lg w-[400px]"
                />
              </div>
            </div>
            <div className="w-[50%] flex flex-col items-center space-y-5">
              <div className="flex flex-col">
                <label className="font-semibold text-lg">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="px-3 py-2.5 rounded-lg border shadow-lg w-[400px]"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-lg">
                  Confirm Password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className="px-3 py-2.5 rounded-lg border shadow-lg w-[400px]"
                />
              </div>

              <div className="py-2">
                <button className="bg-[#3B82F6] px-10 py-2.5 rounded-lg text-white font-semibold">
                  Change
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
