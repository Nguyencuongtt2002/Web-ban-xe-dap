import axios from "../utils/axiosCustomize";
const getALL = async () => {
    return axios.get("sanpham/get-desc")
}
const CreateSanPham = async (obj) => {
    return axios.post("sanpham/create", obj);
}
const UpdateSanPham = async (obj) => {
    return axios.put("sanpham/update", obj)
}
const DeleteSanPham = async (id) => {
    return axios.delete(`sanpham/delete/${id}`)
}
export { CreateSanPham, getALL, UpdateSanPham, DeleteSanPham }