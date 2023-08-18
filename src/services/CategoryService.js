import Axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/category";

class CategoryService {
  getAllCategory = async (payload) => {
    return Axios.get(`${BASEURL}/all`, payload);
  };
}

export default new CategoryService();
