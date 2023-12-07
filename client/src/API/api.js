import axios from "axios";
import { useContext, useRef } from "react";
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        const api_token = user && user.token ? user.token : null;
      let client = null;
      const api_url = process.env.REACT_APP_BASE_URL;
      const init = () => {
        let headers = {
          Accept: "application/json"
        };
        client = axios.create({baseURL: api_url, timeout: 31000, headers: headers});
        return client;
      };
      
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllProducts: (params) => init().get("/product", { params: params }),
    login: (body) => init().post('/auth/login',body)
}