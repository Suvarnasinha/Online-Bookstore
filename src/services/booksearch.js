import Axios from "axios";
const BASEURL = "http://localhost:5000/api/book/search?keyword=New book description";
class booksearch {
  GetAllBooks = async (payload) => {
    return Axios.get(`${BASEURL}/all`, payload);
  };
}
export default new booksearch();
