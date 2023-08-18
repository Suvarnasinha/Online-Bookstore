import axios from "axios";

const BASEURL="https://book-e-sell-node-api.vercel.app/api/cart";

class CartService {

add = async (data) => {
     return axios.post(BASEURL, data);
};

getlist = async (id) => { 
    const url = `${BASEURL} ?userId=${id}`; 
    return axios.get(url);
};
updateItems=async (data) => {
    const url = `${BASEURL}`;
     return axios.put(url, data);
};

removeItem= async (id) => { 
    const url= `$(BASEURL)?id=${id}`;
 return axios.delete(url);
};
}


export default new CartService();