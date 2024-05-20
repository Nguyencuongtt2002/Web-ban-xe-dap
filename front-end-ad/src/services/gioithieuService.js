import axios from "../utils/axiosCustomize";
const getALL = async () => {
    return axios.get("gioithieu/get-desc")
}
const CreateGioiThieu = async (obj) => {
    return axios.post("gioithieu/create", obj);
}
const UpdateGioiThieu = async (obj) => {
    return axios.put("gioithieu/update", obj)
}
const DeleteGioiThieu = async (id) => {
    return axios.delete(`gioithieu/delete/${id}`)
}
export { CreateGioiThieu, getALL, UpdateGioiThieu, DeleteGioiThieu }