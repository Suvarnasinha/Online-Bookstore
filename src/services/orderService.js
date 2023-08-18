import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/order";

class orderService {
  placeOrder = async (order) => {
    return axios.post(BASEURL, order); // Changed 'data' to 'order'
  };
}

export default new orderService();