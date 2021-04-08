import axios from "axios";
import { URL } from "../URLconfig";
let token = window.localStorage.getItem("token");

console.log(token);
console.log(URL)
const axiosURL = axios.create({
  baseURL: URL,
  headers: {
    Authorization: token ? "Bearer " + token : " ",
  },
});
console.log("THIS IS URL" + URL);
export default axiosURL;
