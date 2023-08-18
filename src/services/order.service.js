// // import request from "./request";

// // const ENDPOINT = "api/order";

// // const placeOrder = async (order) => {
// //   const url = `${ENDPOINT}`;
// //   return request
// //     .post(url, order)
// //     .then((res) => {
// //       return res;
// //     })
// //     .catch((e) => {
// //       return Promise.reject(e);
// //     });
// // };

// // const orderService = { placeOrder };

// // export default orderService;
// import axios from "axios";

// const BASEURL = "https://book-e-sell-node-api.vercel.app/api/order";

// class orderService {
//   placeOrder = async (order) => {
//     return axios.post(BASEURL, order); // Changed 'data' to 'order'
//   };
// }

// export default new orderService(); // Export the class instance
