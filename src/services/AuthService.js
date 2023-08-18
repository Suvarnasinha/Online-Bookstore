import Axios from "axios";
const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";
class AuthService {
  Register = async (payload) => {
    return Axios.post(`${BASEURL}`, payload);
  };

  Login = async (payload) => {
    return Axios.post(`${BASEURL}/login`, payload);
  };
}
export default new AuthService();