import axios from "../utils/axiosCustomize";
const Login = async (obj) => {
    return axios.post("nguoidung/login", { ...obj });
}
const CreateNguoiDung = async (obj) => {
    return axios.post("nguoidung/create", obj);
}
export { Login, CreateNguoiDung }