import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";

class UserService {
    getAllUsers = async (filters) => {
    return axios.get(`${BASEURL}/all`, { params: filters });
  };

  deleteUser = async (id) => {
    const url = `${BASEURL}?id=${id}`;
    return axios.delete(url);
  };

  Save = async (payload) => {
    const url = `${BASEURL}`;
    return axios.post(url,payload);
  };
  
}

export default new UserService();