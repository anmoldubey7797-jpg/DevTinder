import axios from "axios";
import { removeUserRequest } from "../utils/requestSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) return null;

  const { firstName, lastName, _id, age, gender } = user;

  const handleSendRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.log(error.message);
    }
  };

 return (
  <div className="flex justify-center mt-10">
    <div className="w-[320px] bg-white border rounded-lg shadow-md p-5 text-center">

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="User Avatar"
          className="w-20 h-20 rounded-full border"
        />
      </div>

      {/* Name */}
      <h2 className="text-lg font-semibold text-gray-800">
        {firstName} {lastName}
      </h2>

      {/* Bio */}
      <p className="text-gray-500 text-sm mt-1">
        Aspiring Web Developer
      </p>

      {/* Age + Gender */}
      <p className="text-gray-600 text-sm mt-2">
        {age} • {gender}
      </p>

      {/* Buttons */}
      <div className="mt-4 flex gap-3 justify-center">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          onClick={() => handleSendRequest("ignored")}
        >
          Ignore
        </button>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => handleSendRequest("interested")}
        >
          Interested
        </button>
      </div>

    </div>
  </div>
);
};

export default UserCard;