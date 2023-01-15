import axios from "axios";

const instance = axios.create({ baseURL: `http://localhost:5000/` });

declare module "axios" {
  export interface AxiosRequestConfig {
    title?: string;
    postType?: string;
  }
}

export default instance;
