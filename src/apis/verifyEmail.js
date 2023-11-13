import axios from "axios";
import { BASE_URL } from "../constants";

const verifyEmail = async (email) => {
  try {
    let res = await axios.post(`${BASE_URL}/api/v1/user/check-email-validity`, {
      email,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default verifyEmail;
