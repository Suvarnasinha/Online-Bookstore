import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";

class BookService {
  GetAllBooks = async (params) => {
    return axios.get(`${BASEURL}/all`, { params}); // Pass payload as params
  };

  SearchBook = async (searchText) => {
    const url = `${BASEURL}/search?keyword=${searchText}`;
    return axios.get(url);
  };

  Save = async (payload) => {
    const url = `${BASEURL}`;
    return axios.post(url,payload);
  };

  // getById = async (id) => {
  //   const url = `${BASEURL}/byId?id=${id}`;
  //   return axios.get(url);
  // };

   deleteBook = async (id) => {
    const url = `${BASEURL}?id=${id}`;
    return axios.delete(url);
  };

}

export default new BookService();
