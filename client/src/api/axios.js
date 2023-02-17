import axios from "axios";
import { defaultOptions, privateOptions } from "./axios.config";

export default axios.create(defaultOptions);
export const axiosPrivate = axios.create(privateOptions);
