import { BASE_URL } from "../constants";
import axios from "axios";

const sendMessage = async (firstName, lastName, email, message) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/user/send-message`, {
      firstName,
      lastName,
      email,
      message,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default sendMessage;
