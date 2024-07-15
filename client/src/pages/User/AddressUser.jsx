import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MenuUser from "../../components/MenuUser";
import { useSelector } from "react-redux";
import vit from "../../assets/vit-bd.jpg";
import {
  useProfileQuery,
  useUpdateAddressMutation,
} from "../../redux/api/userApiSlice";
import { useNavigate } from "react-router";

const AddressUser = () => {
  const { data: profile, refetch } = useProfileQuery();

  const [street, setStreet] = useState(profile?.address?.street || "");
  const [city, setCity] = useState(profile?.address?.city || "");
  const [state, setState] = useState(profile?.address?.state || "");
  const [zip, setZip] = useState(profile?.address?.zip || "");
  const [country, setCountry] = useState(profile?.address?.country || "");


  const [updateAddress] = useUpdateAddressMutation();
  const navigate = useNavigate();

  const { _id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (profile?.address && profile._id) {
      setStreet(profile?.address?.street);
      setCity(profile?.address?.city);
      setState(profile?.address?.state);
      setZip(profile?.address?.zip);
      setCountry(profile?.address?.country);
      refetch();
    }
  }, [profile, profile?.full_name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateAddress({
        street,
        city,
        state,
        zip,
        country,
      }).unwrap();
      console.log(res);
      toast.success("Thay đổi thông tin thành công");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="w-full flex ">
      <MenuUser data={profile} />
      <div className="w-full my-5 px-3 ">
        <div className="w-full h-[60%] bg-white/40 rounded-xl shadow-xl b">
          <div className="w-[25%] px-5 py-5">
            <div className="font-bold text-2xl">Address Info</div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full px-5 py-5 flex flex-row  "
          >
            <div className="w-full flex flex-col items-center justify-center space-y-5  ">
              <div className="flex w-full justify-center space-x-5">
                <div className="flex flex-col w-[20%]">
                  <label>Country</label>
                  <input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    className="py-3 rounded-lg border px-3"
                  />
                </div>
                <div className="flex flex-col w-[20%]">
                  <label>State</label>
                  <input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    type="text"
                    className="py-3 rounded-lg border px-3"
                  />
                </div>
              </div>
              <div className="flex justify-center w-full space-x-5">
                <div className="flex flex-col w-[20%]">
                  <label>City</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    className="py-3 rounded-lg border px-3"
                  />
                </div>
                <div className="flex flex-col w-[20%]">
                  <label>Zip</label>
                  <input
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    type="text"
                    className="py-3 rounded-lg border px-3"
                  />
                </div>
              </div>
              <div className="flex flex-col w-[42%]">
                <label>Street</label>
                <input
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  type="text"
                  className="py-3 rounded-lg border px-3"
                />
              </div>
              <div className="flex ">
                <button className="bg-[#3B82F6] px-3 py-2 rounded-lg font-semibold text-lg text-white shadow-xl border ">
                  Change Address
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressUser;
